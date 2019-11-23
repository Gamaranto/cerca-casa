const extractInfo = require("./extractInfo");
const extractSchema = require("./extractSchema");

module.exports = function(context) {
  const { $, request } = context;
  if (request.url == "https://www.casa.it/affitto/residenziale/pisa") {
    return {};
  }
  const schema = extractSchema($);
  return extractInfo({ $, schema });
};
