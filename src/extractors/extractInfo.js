function extractInfo({ $, schema: rawSchema }) {
  var schema = rawSchema["@graph"][2] || {};

  var title = getTitle();
  var { url } = schema;
  var price = getPrice();
  var description = getDescription();
  var address = getAddress(schema);
  var geo = getGeo(schema);
  var photos = getPhotos(schema);
  var phone = getPhone();
  var announcementCode = getAnnouncementCode();
  return {
    title,
    url,
    price,
    description,
    address,
    geo,
    photos,
    phone,
    announcementCode
  };

  // *****************

  function getTitle() {
    return $("title").text();
  }

  function getPrice() {
    var price = $(".pinfo-price")
      .text()
      .replace(".", "")
      .replace("€", "");
    return parseInt(price, 10);
  }

  function getDescription() {
    return $(".description p").text();
  }

  function getAddress(schema) {
    var {
      address: {
        streetAddress = "",
        addressLocality = "",
        addressRegion = ""
      } = {}
    } = schema || {};
    return `${streetAddress} ${addressLocality} ${addressRegion}`.trim();
  }

  function getGeo(schema) {
    var { geo: { latitude = undefined, longitude = undefined } = {} } =
      schema || {};
    return { latitude, longitude };
  }

  function getPhotos(schema) {
    var { photo } = schema;
    return photo.length
      ? photo.map(({ contentUrl }) => contentUrl)
      : photo.contentUrl;
  }

  function getPhone() {
    return $("a.cut-number").text();
  }

  function getAnnouncementCode() {
    return $(
      ".sidebar-form > div.contact-agency > div.agency-info > div.call-now > div.code-rif > ul > li > b:nth-child(1)"
    ).text();
  }
}

module.exports = extractInfo;
