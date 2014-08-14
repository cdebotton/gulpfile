'use strict';

var gulp = require('gulp');
var task = require('./task');

gulp.task('browserify', task.browserify.run);
gulp.task('browserify:build', task.browserify.build);
gulp.task('browserify:watch', task.browserify.watch);

gulp.task('assets', task.assets.run);
gulp.task('assets:build', task.assets.build);
gulp.task('assets:watch', task.assets.watch);

gulp.task('stylus', task.stylus.run);
gulp.task('stylus:build', task.stylus.build);
gulp.task('stylus:watch', task.stylus.watch);

gulp.task('serve:development', task.serve.development);
gulp.task('serve:production', task.serve.production);

gulp.task ('mocha', task.mocha.run);
gulp.task('mocha:watch', task.mocha.watch);

gulp.task('default', ['assets', 'stylus', 'browserify']);
gulp.task('build', ['assets:build', 'stylus:build', 'browserify:build']);
gulp.task('deploy', ['build', 'serve:production']);
gulp.task('watch', ['mocha:watch', 'assets:watch', 'stylus:watch', 'browserify:watch', 'serve:development']);
