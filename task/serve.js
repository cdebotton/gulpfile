'use strict';

var gulp    = require('gulp');
var express = require('gulp-express');

function StartServer(production) {
  express.run({
    file: './index.js',
    env: production ? 'production' : 'development'
  });
}

module.exports = {
  development : StartServer.bind(null, false),
  production  : StartServer.bind(null, true)
}
