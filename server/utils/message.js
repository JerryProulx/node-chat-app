var generateMessage = function(from, text) {
  return {
    from: from,
    text: text,
    createdAt: new Date().getTime()
  }
};

var generateLocationMessage = function(from, lat, lng) {
  return {
    from: from,
    url: `https://www.google.ca/maps?q=${lat},${lng}`,
    createdAt: new Date().getTime()
  }
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
