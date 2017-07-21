const path = require('path');
const express = require('express');
var app = express();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

//middleware
app.use(express.static(publicPath));


//port listening to
app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
});
