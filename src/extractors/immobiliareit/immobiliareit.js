module.exports = function(context) {
  const { $, request } = context;
  return {
    title: getTitle(),
    url: request.loadedUrl,
    price: getPrice(),
    phone: getPhone(),
    announcementCode: getAnnouncementCode(),
    description: getDescription(),
    address: getAddress(),
    mq2: getMq2()
  };

  // ***********

  function getPrice() {
    var price = $(".features__price > span:nth-child(1)")
      .text()
      .replace("€", "");
    return parseInt(price, 10);
  }

  function getPhotos() {
    console.log(request);
  }

  function getPhone() {
    return $(".contact-phone-modal > p:nth-child(3)")
      .text()
      .replace(/\s/g, "");
  }

  function getAnnouncementCode() {
    return $("dl > .col-xs-12.col-sm-7")
      .text()
      .trim();
  }

  function getAddress() {
    return $(".im-address__content")
      .text()
      .trim();
  }

  function getDescription() {
    return $(".description-text > div:nth-child(1)")
      .text()
      .trim();
  }

  function getTitle() {
    return $("title")
      .text()
      .trim();
  }

  function getMq2() {
    var mq2 = $("dl > dd:nth-child(8)").text();
    return parseInt(mq2, 10);
  }
};
