'use strict'

import { task, src, dest, lastRun } from 'gulp'
import path from '../path.js'
import plumber from 'gulp-plumber'

function fonts () {
  return src(path.src.fonts, { since: lastRun(fonts) })
    .pipe(plumber())
    .pipe(dest(path.dist.fonts))
}

task('fonts', fonts)
