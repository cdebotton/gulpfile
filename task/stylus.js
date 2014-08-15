'use strict';

var gulp        = require('gulp');
var stylus      = require('gulp-stylus');
var plumber     = require('gulp-plumber');
var gutil       = require('gulp-util');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var minifyCss   = require('gulp-minify-css');
var express     = require('gulp-express');
var nib         = require('nib');
var streamqueue = require('streamqueue');

var PATHS = {
  NORMALIZE   : './node_modules/normalize.css/normalize.css',
  FONTAWESOME : './node_modules/font-awesome/css/font-awesome.css',
  SRC         : './src/styles/index.styl',
  BUILD       : './build/stylesheets/'
};

function StylusCompiler(watch, minify) {
  function run() {
    var stream = streamqueue({objectMode: true});

    stream.queue(gulp.src(PATHS.NORMALIZE));

    stream.queue(gulp.src(PATHS.FONTAWESOME));

    stream.queue(gulp.src(PATHS.SRC)
      .pipe(stylus({
        use: [nib()]
      }))
      .pipe(plumber()));

    return stream.done()
      .pipe(concat('app.css'))
      .pipe(rename({ suffix: minify ? '.min' : '' }))
      .pipe(minify ? minifyCss() : gutil.noop())
      .pipe(gulp.dest(PATHS.BUILD));
  }

  if (watch) {
    gulp.watch('./src/**/*.styl', run);
    gulp.watch('./build/stylesheets/**/*.css', express.notify);
  }

  return run();
}

module.exports = {
  run   : StylusCompiler.bind(null, false, false),
  watch : StylusCompiler.bind(null, true, false),
  build : StylusCompiler.bind(null, false, true)
};
