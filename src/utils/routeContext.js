const { getSourceFromUrl } = require("./getSourceFromUrl");

function routeContext(sources, pageFns) {
  return function(context) {
    var topUrl = extractTopUrl(context.request.url);
    var { pseudoUrls } = getSourceFromUrl(sources, topUrl);
    var fnKey = topUrl.replace(/https?:\/\//g, "").replace(/(w|\.)/g, "");
    var result = pageFns[fnKey](context);
    console.log({ result, pseudoUrls });
    return {
      result,
      pseudoUrls
    };
  };
}

module.exports = routeContext;

// ******************************

function extractTopUrl(url) {
  var [topUrl] = url.match("https?://[^/]+");
  return topUrl;
}
