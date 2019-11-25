const Apify = require("apify");
const {
  utils: { enqueueLinks }
} = Apify;

const extractors = require("./extractors/index");
const routeContext = require("./utils/routeContext");

Apify.main(async () => {
  const input = await Apify.getInput();
  if (!input) {
    throw new Error("Have you passed the correct INPUT ?");
  }

  const { sources } = input;

  const pageFunction = routeContext(sources, extractors);

  const urls = sources.map(({ url }) => ({
    url
  }));

  const requestList = new Apify.RequestList({ sources: urls });
  await requestList.initialize();

  const requestQueue = await Apify.openRequestQueue();

  const crawler = new Apify.CheerioCrawler({
    maxRequestsPerCrawl: 20,
    requestList,
    requestQueue,
    handlePageFunction
  });

  await crawler.run();

  // ***********************

  async function handlePageFunction({ request, $ }) {
    const { result, pseudoUrls } = pageFunction({ request, $ });
    const enqueued = await enqueueLinks({
      $,
      requestQueue,
      pseudoUrls,
      baseUrl: request.loadedUrl
    });

    console.log(`Enqueued ${enqueued.length} URLs.`);
    await Apify.pushData({ result });
  }
});
