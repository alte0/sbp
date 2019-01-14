const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const path = require('../path.js');

gulp.task('fonts', function() {
  return gulp.src([path.src.fonts]).pipe(gulp.dest(path.dist.fonts));
});
