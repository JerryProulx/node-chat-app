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
});
