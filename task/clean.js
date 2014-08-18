'use strict';

var gulp  = require('gulp');
var clean = require('gulp-clean');

function Clean() {
  gulp.src('./build/', {read: false})
    .pipe(clean());
}

module.exports = Clean;
