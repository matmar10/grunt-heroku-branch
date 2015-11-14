var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.status(200).send('Hello World!');
});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Sample app listening at http://%s:%s', host, port);
});