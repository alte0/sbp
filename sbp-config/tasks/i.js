const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const path = require('../path.js');
const flags = require('../flags.js');
const browserSync = require('browser-sync');

gulp.task('i', function() {
  return gulp
    .src(path.src.i)
    .pipe(plumber())
    .pipe(gulp.dest(path.dist.i))
    .pipe(gulpif(flags.watch, browserSync.stream()))
})
