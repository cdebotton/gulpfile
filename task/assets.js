'use strict';

var gulp        = require('gulp');
var minifyHtml  = require('gulp-minify-html');
var gutil       = require('gulp-util');

function AssetPipeline(watch, compile) {
  function moveFiles() {
    gulp.src('./src/assets/**/*')
      .pipe(compile ? minifyHtml() : gutil.noop())
      .pipe(gulp.dest('./build/'));
  }
  if (watch) {
    gulp.watch('./src/assets/**/*', moveFiles);
  }
  return moveFiles();
}

module.exports = {
  run   : AssetPipeline.bind(null, false, false),
  build : AssetPipeline.bind(null, false, true),
  watch : AssetPipeline.bind(null, true, false)
};
