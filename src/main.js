const Apify = require("apify");
const {
  utils: { enqueueLinks }
} = Apify;

const extractSchema = require("./extractors/extractSchema");
const extractInfo = require("./extractors/extractInfo");

Apify.main(async () => {
  const requestQueue = await Apify.openRequestQueue();
  await requestQueue.addRequest({
    url: "https://www.casa.it/affitto/residenziale/pisa"
  });

  const crawler = new Apify.CheerioCrawler({
    maxRequestsPerCrawl: 40,
    requestQueue,
    handlePageFunction,
    useApifyProxy: true
  });

  await crawler.run();

  // ***********************

  async function handlePageFunction({ request, $ }) {
    const schema = extractSchema($);
    var result = extractInfo({ $, schema });
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
