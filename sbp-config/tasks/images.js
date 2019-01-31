'use strict'

import { task, src, dest, lastRun } from 'gulp'
import path from '../path'
import flags from '../flags'
import plumber from 'gulp-plumber'
import gulpif from 'gulp-if'
import imagemin from 'gulp-imagemin'
import browserSync from 'browser-sync'

function images () {
  return src(path.src.images, { since: lastRun(images) })
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true, optimizationLevel: 1 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupAttrs: true },
            { removeEmptyAttrs: true },
            { removeComments: true },
            { removeEditorsNSData: true },
            { convertColors: true },
            { cleanupIDs: false }
          ]
        })
      ])
    )
    .pipe(dest(path.dist.images))
    .pipe(gulpif(flags.watch, browserSync.stream()))
}

function i () {
  return src(path.src.i, { since: lastRun(i) })
    .pipe(plumber())
    .pipe(dest(path.dist.i))
    .pipe(gulpif(flags.watch, browserSync.stream()))
}

task('images', images)
task('i', i)
