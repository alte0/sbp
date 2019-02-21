'use strict'

import { task, src, dest } from 'gulp'
import path from '../path'
import plumber from 'gulp-plumber'
import spritesmith from 'gulp.spritesmith'
import buffer from 'vinyl-buffer'
import imagemin from 'gulp-imagemin'
import svgSprites from 'gulp-svg-sprites'
import svgSymbols from 'gulp-svg-symbols'
import svgmin from 'gulp-svgmin'
import { svgConfigPlugs } from '../svgConfigPlugs'

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
  return (
    src(path.src.spritesSvg)
      .pipe(plumber())
      .pipe(svgmin(svgConfigPlugs))
      .pipe(
        svgSprites({
          mode: 'sprite',
          common: 'icon',
          // templates: {
          //   scss: true
          // },
          cssFile: '../src/scss/sprite/spriteSvg.scss',
          svg: {
            sprite: 'images/sprite/sprite.svg'
          },
          preview: false,
          padding: 10,
          selector: '%f'
        })
      )
      .pipe(dest(path.dist.spriteSvg))
  )
}

function symbolsSVG () {
  return (
    src(path.src.symbolsSvg)
      .pipe(plumber())
      .pipe(svgmin(svgConfigPlugs))
      .pipe(
        svgSymbols({
          svgAttrs: { class: `svg-symbol` },
          class: `.svg-symbol--%f`,
          templates: ['default-svg']
        })
      )
      .pipe(dest(path.dist.symbolsSvg))
  )
}

task('sprites', sprites)
task('spritesSVG', spritesSVG)
task('symbolsSVG', symbolsSVG)
