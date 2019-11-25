const extractInfo = require("./extractInfo");
const extractSchema = require("./extractSchema");

module.exports = function(context) {
  const { $ } = context;
  const schema = extractSchema($);

  return extractInfo({ $, schema });
};
