const gulp = require('gulp');
const path = require('../path.js');
const plumber = require('gulp-plumber');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');

gulp.task('sprites', function() {
  const fileNameSprite = 'sprite.png'
  const fileNameSprite2x = 'sprite@2x.png'
  const spriteData = gulp
    .src(path.src.sprites)
    .pipe(plumber())
    .pipe(
      spritesmith({
        retinaSrcFilter: 'src/sprites-png/*@2x.png',
        imgName: fileNameSprite,
        retinaImgName: fileNameSprite2x,
        //.css, .sass, .scss, .less, .styl/.stylus
        //cssFormat: 'scss', // с этой переменной нет ретины
        cssName: 'sprite.scss',
        padding: 10,
        imgPath: '../images/sprite/' + fileNameSprite,
        retinaImgPath: '../images/sprite/' + fileNameSprite2x
      })
    )

  spriteData.img
    .pipe(buffer())
    .pipe(imagemin(imagemin.optipng({ optimizationLevel: 5 })))
    .pipe(gulp.dest(path.dist.sprite))
  spriteData.css.pipe(gulp.dest('./src/scss/sprite/'))

  return spriteData;
});
