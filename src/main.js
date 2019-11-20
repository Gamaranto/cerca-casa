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
    maxRequestsPerCrawl: 20,
    requestQueue,
    handlePageFunction
  });

  await crawler.run();

  // ***********************

  async function handlePageFunction({ request, $ }) {
    console.log("ciao");
    // const schema = extractSchema($);
    // var result = extractInfo({ $, schema });

    const enqueued = await enqueueLinks({
      $,
      requestQueue,
      pseudoUrls: ["http[s?]://www.casa.it/[.*]/affitto/pisa[.*]"],
      baseUrl: request.loadedUrl
    });
    console.log(`Enqueued ${enqueued.length} URLs.`);
    return {
      title: $("title").text()
    };
  }
});
