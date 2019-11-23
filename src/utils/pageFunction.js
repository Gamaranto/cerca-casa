// ****************
function pageFunction(context, fn) {
  return function(options) {
    return fn(context, options);
  };
}
exports.pageFunction = pageFunction;
