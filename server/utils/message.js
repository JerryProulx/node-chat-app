var moment = require('moment');

var generateMessage = function(from, text) {
  return {
    from: from,
    text: text,
    createdAt: moment().valueOf()
  }
};

var generateLocationMessage = function(from, lat, lng) {
  return {
    from: from,
    url: `https://www.google.ca/maps?q=${lat},${lng}`,
    createdAt: moment().valueOf()
  }
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
