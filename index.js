'use strict';

var express     = require('express');
var serveStatic = require('serve-static');
var compression = require('compression');
var bodyParser  = require('body-parser');
var lr          = require('tiny-lr')();
var connectLr   = require('connect-livereload')();

var app = express();
app.use(compression())
   .use(serveStatic('./build'))
   .use(bodyParser.urlencoded({extended: true}))
   .use(bodyParser.json())
   .use(connectLr)
   .listen(3000, function(err) {
     if (err) throw err;
     console.log('Listening on port 3000!');
   });

module.exports.app = exports.app = app;
