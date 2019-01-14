const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const path = require('../path.js');
const zip = require('gulp-zip');

gulp.task('zipArchive', function() {
  return gulp
    .src('dist/**/*.*')
    .pipe(plumber())
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('dist'))
})
