'use strict';

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var streamify   = require('gulp-streamify');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var express     = require('gulp-express');
var browserify  = require('browserify');
var watchify    = require('watchify');
var envify      = require('envify');
var reactify    = require('reactify');
var source      = require('vinyl-source-stream');

function AssetPipeline(watch, build) {
  var path    = require.resolve('../src/index.js');

  watchify.args.fullPaths = watch;
  watchify.args.debug = !build ? true : false;
  watchify.args.entry = watch;
  var bundler = browserify(path, watchify.args);

  if (watch) {
    bundler = watchify(bundler);
    gulp.watch('./build/**/*.js', express.notify);
  }

  bundler.transform(reactify)
         .transform(envify)
         .on('update', rebundle)
         .on('time', function(time) {
           gutil.log(
             'Finished',
             gutil.colors.green('browserify:watch#rebundle()'),
             'after',
             gutil.colors.red(time +  ' ms')
           );
         });

  function rebundle() {
    return bundler.bundle()
      .on('error', function(err) { console.log(err.toString()); })
      .pipe(source('bundle.js'))
      .pipe(build ? rename({suffix: '.min'}) : gutil.noop())
      .pipe(build ? streamify(uglify()) : gutil.noop())
      .pipe(gulp.dest('./build/'));
  }

  return rebundle();
}

module.exports = {
  run   : AssetPipeline.bind(null, false, false),
  watch : AssetPipeline.bind(null, true, false),
  build : AssetPipeline.bind(null, false, true)
};
