const Apify = require("apify");
const {
  utils: { enqueueLinks }
} = Apify;

const extractors = require("./extractors/index");
const routeContext = require("./utils/routeContext");
const filterResults = require("./utils/filterResults");

Apify.main(async () => {
  const input = await Apify.getInput();
  if (!input) {
    throw new Error("Have you passed the correct INPUT ?");
  }

  const { sources, maxRequestsPerCrawl, filters } = input;

  const pageFunction = routeContext(sources, extractors);

  const urls = sources.map(({ url }) => ({
    url
  }));

  const requestList = new Apify.RequestList({ sources: urls });
  await requestList.initialize();

  const requestQueue = await Apify.openRequestQueue();

  const crawler = new Apify.CheerioCrawler({
    maxRequestsPerCrawl,
    requestList,
    requestQueue,
    handlePageFunction,
    useApifyProxies: true
  });

  await crawler.run();

  // ***********************

  async function handlePageFunction({ request, $ }) {
    const { result, pseudoUrls } = pageFunction({ request, $ });

    const enqueued = await enqueueLinks({
      $,
      requestQueue,
      pseudoUrls,
      baseUrl: request.loadedUrl,
      useApifyProxies: true
    });

    console.log(`Enqueued ${enqueued.length} URLs.`);

    if (filterResults(result, filters)) {
      await Apify.pushData({ result });
    }
  }
});
