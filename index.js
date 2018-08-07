const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://jvacl:NoveHeslo,.123@ds113692.mlab.com:13692/tstdb');
*/
const options = {
  user: 'jvacl',
  pass: 'NoveHeslo,.123'
};

var mongoose = require('mongoose');
mongoose.connect('mongodb://ds113692.mlab.com:13692/tstdb', options);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.get('/', (req, res) => {
  res.send('\n\nHello, world!\n\n');
});

app.listen(port, () => {
  console.log(`listening on port ${ port }`);
});