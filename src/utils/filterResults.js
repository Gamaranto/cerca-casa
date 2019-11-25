module.exports = function filterResults(
  data,
  { minPrice = 0, maxPrice = Infinity, minMq2 = 0, maxMq2 = Infinity }
) {
  const { price, mq2 } = data;

  if (
    minPrice <= price &&
    price <= maxPrice &&
    minMq2 <= mq2 &&
    mq2 <= maxMq2
  ) {
    return true;
  }
  return false;
};
