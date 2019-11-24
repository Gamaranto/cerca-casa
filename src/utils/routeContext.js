function routeContext(sources, pageFns) {
  return function(context) {
    var topUrl = extractTopUrl(context.request.url);
    var { pseudoUrls } = getSourceFromUrl(sources, topUrl);
    // https://www.url.com -> urlcom
    var fnKey = topUrl.replace(/https?:\/\//g, "").replace(/(w|\.)/g, "");
    var result = pageFns[fnKey](context);
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

function getSourceFromUrl(sources, topLevelUrl) {
  return sources.find(({ url }) => url.includes(topLevelUrl));
}
