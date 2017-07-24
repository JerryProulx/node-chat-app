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
