'use strict'

import { task, src, dest } from 'gulp'
import path from '../path'
import plumber from 'gulp-plumber'
import spritesmith from 'gulp.spritesmith'
import buffer from 'vinyl-buffer'
import imagemin from 'gulp-imagemin'
import svgSprite from 'gulp-svg-sprites'

function sprites () {
  const fileNameSprite = 'sprite.png'
  const fileNameSprite2x = 'sprite@2x.png'
  const spriteData = src(path.src.sprites)
    .pipe(plumber())
    .pipe(
      spritesmith({
        retinaSrcFilter: 'src/sprites-png/*@2x.png',
        imgName: fileNameSprite,
        retinaImgName: fileNameSprite2x,
        // .css, .sass, .scss, .less, .styl/.stylus
        // cssFormat: 'scss', // с этой переменной нет ретины
        cssName: 'sprite.scss',
        padding: 10,
        imgPath: '../images/sprite/' + fileNameSprite,
        retinaImgPath: '../images/sprite/' + fileNameSprite2x
      })
    )

  spriteData.img
    .pipe(buffer())
    .pipe(imagemin(imagemin.optipng({ optimizationLevel: 5 })))
    .pipe(dest(path.dist.sprite))
  spriteData.css.pipe(dest('./src/scss/sprite/'))

  return spriteData
}

function spritesSVG () {
  return src(path.src.spritesSvg)
    .pipe(plumber())
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
    .pipe(dest(path.dist.spriteSvg))
}

function spritesSymbolsSVG () {
  return src(path.src.spritesSymbolSvg)
    .pipe(plumber())
    .pipe(svgSprite({ mode: 'symbols' }))
    .pipe(dest(path.dist.spriteSvg))
}

task('sprites', sprites)
task('spritesSVG', spritesSVG)
task('spritesSymbolsSVG', spritesSymbolsSVG)
