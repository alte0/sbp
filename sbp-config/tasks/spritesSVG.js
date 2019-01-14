const gulp = require('gulp');
const plumber = require('gulp-plumber');
const path = require('../path.js');
const svgSprite = require('gulp-svg-sprites');

gulp.task('spritesSVG', function() {
  return gulp
    .src(path.src.spritesSvg)
    .pipe(
      svgSprite({
        /**
         * By default, the class `icon` will be used as the common class.
         * but you can chose your own here
         */
        mode: 'sprite',
        common: 'icon',
        // templates: {
        //   scss: true // не валидный scss
        // },
        cssFile: '../src/scss/sprite/spriteSvg.scss',
        svg: {
          sprite: 'images/sprite/sprite.svg'
        },
        preview: true,
        padding: 10,
        /**
         * Easily add
         */
        selector: 'svg-%f'
      })
    )
    .pipe(gulp.dest(path.dist.spriteSvg))
});
