'use strict';

var gulp    = require('gulp');
var mocha   = require('gulp-mocha');
var coffee  = require('coffee-script');

require('coffee-script/register');

function TestRunner(watch) {
  if (watch) {
    gulp.watch([
      './test/**/*Test.coffee',
      './src/**/*.js',
      './src/**/*.jsx'
    ], run);
  }

  function run() {
    gulp.src([
      './test/unit/**/*.coffee',
      './test/integration/**/*.coffee'
    ])
      .pipe(mocha())
      .on('error', function(err) { console.log(err); });
  }

  return run();
}


module.exports = {
  run   : TestRunner.bind(null, false),
  watch : TestRunner.bind(null, true)
};
