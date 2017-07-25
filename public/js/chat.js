var socket = io();

function scrollToBottom () {
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(error){
    if(error){
      alert(error);
      window.location.href ='/';
    }else{
      console.log('no error');
    }
  });

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

socket.on('updateUserList', function(users){
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
  var template = jQuery('#message-template').html();
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
  //
  // var li = jQuery('<li></li>');
  //
  // li.text(`${message.from} : ${formattedTime} : ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();

  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
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

  if(messageTextBox.val() === '') {
    return false;
  }
  socket.emit('createMessage', {
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
    }, function(){
      alert('error');
    });

  }, function(error){
    locatioButton.removeAttr('disabled');
    alert('unable to fetch location');
  });
});
