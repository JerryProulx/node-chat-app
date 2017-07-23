const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//middleware
app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat room',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (newMessage) => {
    console.log(newMessage);


    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });

  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  })
});

//port listening to
server.listen(port, () => {
  console.log(`App is listening on port ${port}`)
});
