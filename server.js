// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

var parser = require('ua-parser-js');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", function(req, res){

  //after some loonggg research, I think that I've found out the simplest solution for this project.
  //I congratulate myself for my patience !!

  let software = parser(req.get('user-agent'));

  let ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  let language = req.get('accept-language');  

  console.log('Here is the software :'+software.os.name+" "+software.os.version);
  console.log('Here is the ip : '+ip);
  console.log('Here is the language: '+language);
  
  res.json({
    ipaddress: ip,
    language: language,
    software: software.os.name + " " + software.os.version 
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
