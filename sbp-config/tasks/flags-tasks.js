const gulp = require('gulp');
const flags = require('../flags.js');

gulp.task('isMinify', function(cb) {
  flags.minify = true
  console.log('=========> Minify - ', flags.minify)
  cb();
});

gulp.task('isNoWatch', function(cb) {
  flags.watch = false
  console.log('=========> Watching - ', flags.watch)
  cb();
});

gulp.task('isNoBs', function(cb) {
  flags.bs = false
  console.log('=========> BrowserSync - ', flags.bs)
  cb();
});
