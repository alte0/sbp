'use strict'

import { src, dest } from 'gulp';
import path from '../path';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import svgmin from 'gulp-svgmin';
import { svgConfigPlugs } from '../svgConfigPlugs';
// svgConfigPlugs RUS doc https://github.com/svg/svgo/blob/master/README.ru.md

export function imagesTask() {
  return src(path.src.images)
    .pipe(plumber())
    .pipe(
      imagemin([
        // imagemin.gifsicle({ interlaced: true, optimizationLevel: 1 }),
        imagemin.mozjpeg({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo(svgConfigPlugs),
      ]),
    )
    .pipe(dest(path.build.images));
}

export function iTask() {
  return src(path.src.i)
    .pipe(plumber())
    .pipe(svgmin(svgConfigPlugs))
    .pipe(dest(path.build.i));
}
