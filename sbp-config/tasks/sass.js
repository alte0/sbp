'use strict'

import { task, src, dest } from 'gulp'
import path from '../path'
import flags from '../flags'
import plumber from 'gulp-plumber'
import gulpif from 'gulp-if'
import sass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import sassVars from 'gulp-sass-variables'
import stylelint from 'gulp-stylelint'
import autoprefixer from 'gulp-autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
import cssnano from 'gulp-cssnano'

task('sass', function () {
  return (src(path.src.css)
    .pipe(plumber())
    .pipe(gulpif(flags.bs, sourcemaps.init()))
    .pipe(gulpif(flags.minify, sassVars({ $minify: true })))
    .pipe(sassGlob())
    .pipe(
      stylelint({
        reporters: [{ formatter: 'string', console: true }]
      })
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        // browsers: ['last 2 versions', 'ie >= 10'],
        browsers: ['last 2 version', '> 1%', 'ie >= 10'],
        cascade: false
      })
    )
    .pipe(gulpif(flags.minify, cssnano()))
    .pipe(gulpif(flags.bs, sourcemaps.write()))
    .pipe(dest(path.dist.css))
  )
})
