const gulp = require('gulp');
const plumber = require('gulp-plumber');
const path = require('../path.js');
const svgSprite = require('gulp-svg-sprites');

gulp.task('spritesSymbolsSVG', function() {
  return gulp
    .src(path.src.spritesSymbolSvg)
    .pipe(svgSprite({ mode: 'symbols' }))
    .pipe(gulp.dest(path.dist.spriteSvg))
});
