const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//middleware
app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined'));

  socket.on('createMessage', (newMessage, callback) => {
    console.log(newMessage);


    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

    callback('This is from the server');
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
