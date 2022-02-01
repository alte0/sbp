'use strict';

import { src, dest } from 'gulp';
import path from '../path';
import flags from '../flags';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
// import sass from 'gulp-sass';
import gulpSass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import sassVars from 'gulp-sass-variables';
// import stylelint from 'gulp-stylelint';
import postcss from 'gulp-postcss';
// import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'gulp-cssnano';
import bs from 'browser-sync';
import dartSass from 'sass';

const sass = gulpSass(dartSass);

export function sassTask () {
  return (src(path.src.css)
    .pipe(plumber())
    .pipe(gulpif(flags.bs, sourcemaps.init()))
    .pipe(gulpif(flags.minify, sassVars({ $minify: true })))
    .pipe(sassGlob())
    /* .pipe(
      stylelint({
        reporters: [
          { formatter: 'string', console: true }
        ]
      })
    ) */
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(gulpif(flags.minify, cssnano()))
    .pipe(gulpif(!flags.watch, cssnano()))
    .pipe(gulpif(flags.bs, sourcemaps.write('.')))
    .pipe(dest(path.build.css))
    .pipe(gulpif(flags.bs, bs.stream()))
  );
}
