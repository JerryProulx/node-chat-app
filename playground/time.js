var moment = require('moment');

var now = moment();

console.log(now.format('h:mm a'));

var someTimestamp = moment().valueOf();

console.log(someTimestamp);

console.log(moment(someTimestamp).format('h:mm a'));
