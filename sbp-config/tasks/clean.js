'use strict'

import { task } from 'gulp'
import del from 'del'
import path from '../path'

task('clean-css', function () {
  return del(path.dist.css)
})
task('clean-html', function () {
  return del(path.dist.html + '*.html')
})
task('clean-images', function () {
  return del(path.dist.images)
})
task('clean-i', function () {
  return del(path.dist.i)
})
task('clean-fonts', function () {
  return del(path.dist.fonts)
})
task('clean-js', function () {
  return del(path.dist.js)
})
task('clean-all', function () {
  return del(path.cleanFolder)
})
task('clean-spritesSymbolSvg', function () {
  return del(path.cleanFolderSymbolSvg)
})
