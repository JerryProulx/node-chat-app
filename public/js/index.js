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
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var li = jQuery('<li></li>');

  li.text(`${message.from} : ${formattedTime} : ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${formattedTime} ${message.from}: `);
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

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
});

//Send GEOlocation
var locatioButton = jQuery('#send-location');
locatioButton.on('click', function(e){

  if(!navigator.geolocation) {
    return alert('geolocation not supported by your browser');
  }
  locatioButton.attr('disabled', 'disabled').text('Searching location');

  navigator.geolocation.getCurrentPosition(function(position){
    locatioButton.removeAttr('disabled').text('Send Location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function(error){
    locatioButton.removeAttr('disabled');
    alert('unable to fetch location');
  });
});
