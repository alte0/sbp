const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const path = require('../path.js');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

gulp.task('js:prod', function() {
  const webpackConfigProd = require('../../prod.webpack.config.js')
  return gulp
    .src('./src/js/main.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfigProd, webpack))
    .pipe(gulp.dest(path.dist.js))
})
// webpackStream for development
// js:dev не нужен, он запускается в ExpressJs
