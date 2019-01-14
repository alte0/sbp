const gulp = require('gulp');
const del = require('del');
const path = require('../path.js');

gulp.task('clean-css', function() {
  return del(path.dist.css)
})
gulp.task('clean-html', function() {
  return del(path.dist.html + '*.html')
})
gulp.task('clean-images', function() {
  return del(path.dist.images)
})
gulp.task('clean-i', function() {
  return del(path.dist.i)
})
gulp.task('clean-fonts', function() {
  return del(path.dist.fonts)
})
gulp.task('clean-js', function() {
  return del(path.dist.js)
})
gulp.task('clean-all', function() {
  return del(path.cleanFolder)
})
gulp.task('clean-spritesSymbolSvg', function() {
  return del(path.cleanFolderSymbolSvg)
})
