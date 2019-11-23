function matchTopLevel(topLevel) {
  var rx = new RegExp(`https?://${topLevel}/`);
  return function(str) {
    return !!rx.exec(str);
  };
}
exports.matchTopLevel = matchTopLevel;
