const Apify = require("apify");
const {
  utils: { enqueueLinks }
} = Apify;

const { getSourceFromUrl } = require("./utils/getSourceFromUrl");
const { matchTopLevel } = require("./utils/matchTopLevel");
const { pageFunction } = require("./utils/pageFunction");

const casait = require("./extractors/casait/casait");

const matchCasa = matchTopLevel("www.casa.it");
const matchImmobiliare = matchTopLevel("www.immobiliare.it");

Apify.main(async () => {
  const input = await Apify.getInput();
  if (!input) {
    throw new Error("Have you passed the correct INPUT ?");
  }

  const { sources } = input;
  const urls = sources.map(({ url }) => ({
    url
  }));

  const requestList = new Apify.RequestList({ sources: urls });
  await requestList.initialize();

  const requestQueue = await Apify.openRequestQueue();

  const crawler = new Apify.CheerioCrawler({
    maxRequestsPerCrawl: 40,
    requestList,
    requestQueue,
    handlePageFunction,
    useApifyProxies: true
  });

  await crawler.run();

  // ***********************

  async function handlePageFunction({ request, $ }) {
    // Check what URL we are on

    if (matchCasa(request.url)) {
      var { pseudoUrls } = getSourceFromUrl(sources, "www.casa.it");
      const casaScraper = pageFunction({ request, $ }, casait);
      var result = casaScraper();
    }

    if (matchImmobiliare(request.url)) {
      var { pseudoUrls } = getSourceFromUrl(sources, "www.immobiliare.it");
      console.log(request.loadedUrl);
      console.log($("title").text());
    }

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
