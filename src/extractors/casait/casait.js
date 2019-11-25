const extractInfo = require("./extractInfo");
const extractSchema = require("./extractSchema");

module.exports = function(context) {
  const { $ } = context;
  console.log($("body").html());
  const schema = extractSchema($);

  return extractInfo({ $, schema });
};
