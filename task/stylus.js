'use strict';

var gulp        = require('gulp');
var stylus      = require('gulp-stylus');
var plumber     = require('gulp-plumber');
var gutil       = require('gulp-util');
var rename      = require('gulp-rename');
var minifyCss   = require('gulp-minify-css');
var nib         = require('nib');
var normalize   = require('stylus-normalize');
var express     = require('gulp-express');

function StylusCompiler(watch, minify) {
  function run() {
    return gulp.src('./src/styles/index.styl')
      .pipe(stylus({
        use: [nib(), normalize()]
      }))
      .pipe(plumber())
      .pipe(rename(minify ? 'app.min.css' : 'app.css'))
      .pipe(minify ? minifyCss() : gutil.noop())
      .pipe(gulp.dest('./build/stylesheets/'));
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
