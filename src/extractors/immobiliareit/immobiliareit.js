module.exports = function(context) {
  const { $ } = context;
  return $("title").text();
};
