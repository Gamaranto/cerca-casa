function extractSchema($) {
  var jsonLD = $('script[type="application/ld+json"]');
  var schema = JSON.parse(jsonLD.html());
  return schema;
}

module.exports = extractSchema;
