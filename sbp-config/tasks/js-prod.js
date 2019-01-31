'use strict'

import { task, src, dest } from 'gulp'
import path from '../path'
import webpackConfigProd from '../../prod.webpack.config'
import plumber from 'gulp-plumber'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

task('js:prod', function () {
//   const webpackConfigProd = require('../../prod.webpack.config.js')
  return src('./src/js/main.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfigProd, webpack))
    .pipe(dest(path.dist.js))
})
// webpackStream for development
// js:dev не нужен, он запускается в ExpressJs
