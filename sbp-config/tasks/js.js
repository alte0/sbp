'use strict'

import { src, dest } from 'gulp';
import path from '../path';
import webpackConfigProd from '../../prod.webpack.config';
import webpackConfigDev from '../../dev.webpack.config';
import plumber from 'gulp-plumber';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import gulpif from 'gulp-if';
import flags from '../flags';
import bs from 'browser-sync';

export function jsTask() {
  const webpackConfig = flags.watch ? webpackConfigDev : webpackConfigProd;

  return src('./src/js/main.js')
    .pipe(plumber())

    .pipe(webpackStream(webpackConfig, webpack))
    // .pipe(gulpif(flags.watch, webpackStream(webpackConfigDev, webpack)))
    .pipe(gulpif(flags.watch, dest(path.dev.js)))

    // .pipe(gulpif(!flags.watch, webpackStream(webpackConfigProd, webpack)))
    .pipe(gulpif(!flags.watch, dest(path.build.js)))

    .pipe(gulpif(flags.bs, bs.stream()))
}
