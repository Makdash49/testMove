var express = require('express');
var path = require('path');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {

}

var amazon = require('amazon-product-api');
var client = amazon.createClient({
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET,
  awsTag: "Todo App"
});

client.itemSearch({
  keywords: 'Quiet Please ear plugs'
}).then(function(results){
  console.log(JSON.stringify(results[0]["ItemAttributes"][0]["Title"][0]));
}).catch(function(err){
  console.log(err);
});


//Create our app

var app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
