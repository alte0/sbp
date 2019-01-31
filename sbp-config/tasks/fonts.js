'use strict'

import { task, src, dest } from 'gulp'
import path from '../path.js'

task('fonts', function () {
  return src([path.src.fonts]).pipe(dest(path.dist.fonts))
})
