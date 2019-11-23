function getSourceFromUrl(sources, topLevelUrl) {
  return sources.find(({ url }) => url.includes(topLevelUrl));
}
exports.getSourceFromUrl = getSourceFromUrl;
