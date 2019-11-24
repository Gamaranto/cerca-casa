module.exports = function(context) {
  const { $ } = context;
  return getTitle();

  // ***********

  function getPrice() {}

  function getPhotos() {}

  function getPhone() {}

  function getAnnouncementCode() {}

  function getAddress() {}

  function getDescription() {}

  function getGeo() {}

  function getTitle() {
    return $("title").text();
  }
};
