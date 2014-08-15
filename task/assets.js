'use strict';

var gulp        = require('gulp');
var minifyHtml  = require('gulp-minify-html');
var htmlReplace = require('gulp-html-replace');
var filter      = require('gulp-filter');
var gulpif      = require('gulp-if');

function AssetPipeline(watch, compile) {
  function moveFiles() {
    gulp.src('./src/assets/index.html')
      .pipe(htmlReplace({
        js: !compile ? '/bundle.js' : '/bundle.min.js',
        css: !compile ? '/stylesheets/app.css' : '/stylesheets/app.min.css',
        livereload: !compile ? 'http://127.0.0.1:35729/livereload.js?snipver=1' : ''
      }))
      .pipe(gulpif(compile, minifyHtml()))
      .pipe(gulp.dest('./build/'));

    gulp.src(['./src/assets/**/*', '!./src/assets/index.html'])
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
