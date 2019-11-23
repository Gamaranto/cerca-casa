const Apify = require("apify");
const {
  utils: { enqueueLinks }
} = Apify;

const casait = require("./extractors/casait/casait");

Apify.main(async () => {
  const requestQueue = await Apify.openRequestQueue();
  await requestQueue.addRequest({
    url: "https://www.casa.it/affitto/residenziale/pisa"
  });

  const crawler = new Apify.CheerioCrawler({
    maxRequestsPerCrawl: 20,
    requestQueue,
    handlePageFunction
  });

  await crawler.run();

  // ***********************

  async function handlePageFunction({ request, $ }) {
    const casaScraper = pageFunction({ request, $ }, casait);
    var result = await casaScraper();
    console.log($("title").text());

    const enqueued = await enqueueLinks({
      $,
      requestQueue,
      pseudoUrls: ["https://www.casa.it/[.*]/affitto/pisa[.*]"],
      baseUrl: request.loadedUrl
    });

    console.log(`Enqueued ${enqueued.length} URLs.`);
    await Apify.pushData(result);
  }
});

// ********** Refactor the page function

function pageFunction(context, fn) {
  return function(options) {
    return fn(context, options);
  };
}
