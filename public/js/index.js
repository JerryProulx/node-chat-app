var socket = io();

socket.on('connect', function() {
  console.log('connected to server');

  // socket.emit('createEmail', {
  //     from: 'jerry@test.com',
  //     text: 'Yah!'
  //   });
  // });

  // socket.emit('createMessage', {
  //     from: 'Me',
  //     text: 'Yah!'
  //   });
});

socket.on('disconnect', function() {
  console.log('Server disconnected');
});

socket.on('newMessage', function(message) {
  console.log('new message: ', message);

  var li = jQuery('<li></li>');

  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a);
  jQuery('#messages').append(li);
});
//
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'A soir?'
// }, function(message) {
//   console.log('Got it!', message);
// });

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(message) {
    console.log('Yep!', message);
    jQuery('[name=message]').val('');
  });
});

//Send GEOlocation
var locatioButton = jQuery('#send-location');
locatioButton.on('click', function(e){

  if(!navigator.geolocation) {
    return alert('geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function(position){

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function(error){
    alert('unable to fetch location');
  });
});
