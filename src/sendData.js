const rp = require("request-promise-native");

const uri = "http://localhost:3030/homes";

var options = {
  method: "POST",
  uri,
  json: true
};

async function sendData({ myOptions = options, body }) {
  return await rp({ ...myOptions, body });
}

sendData({
  body: {
    price: 220,
    address: "Random street 11",
    name: "wonderful place"
  }
});
