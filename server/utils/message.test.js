var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {

    var from = 'Jerry';
    var text = 'The text';

    var message = generateMessage(from, text);

    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', ()=> {
  it('should generate a valid url', ()=>{
    var lat = 12;
    var lng = -12;
    var from = 'Jerry';

    var url = `https://www.google.ca/maps?q=${lat},${lng}`;

    var locationMessage = generateLocationMessage(from, lat, lng);

    expect(locationMessage).toInclude({from, url})
    expect(locationMessage.createdAt).toBeA('number');

  });
});
