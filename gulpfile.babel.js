'use strict'

import { task, series, parallel, registry } from 'gulp'
import HubRegistry from 'gulp-hub'
import path from './sbp-config/path'
import flags from './sbp-config/flags'
import watch from 'gulp-watch'
import browserSync from 'browser-sync'
/* load some files into the registry */
const hub = new HubRegistry(['./sbp-config/tasks/*.js'])

/* tell gulp to use the tasks just loaded */
registry(hub)
// ===========================================
// task browser relad page
// ===========================================
task('reload', function () {
  browserSync.reload()
})
// ===========================================
// watching tasks
// ===========================================
task('watch', function (done) {
  if (flags.watch) {
    watch([path.watch.css], series('sass'))
    watch([path.watch.sprites], series('sprites'))
    watch([path.watch.spritesSvg], series('spritesSVG'))
    watch([path.watch.symbolsSvg], series('symbolsSVG', 'reload'))
    watch([path.watch.fonts], series('reload'))
    watch([path.watch.i], series('reload'))
    watch([path.watch.images], series('reload'))
  } else {
    console.log('=========> WATCH - OFF!')
  }

  if (!flags.bs && flags.watch) {
    watch([path.watch.html], series('pug'))
    watch([path.watch.js], series('js:prod'))
    watch([path.watch.images], series('images'))
    watch([path.watch.i], series('i'))
    watch([path.watch.fonts], series('fonts'))
  }

  done()
})
// ===========================================
// Main tasks
// ===========================================
task(
  'default',
  series(
    'clean-all',
    'isNoBs',
    parallel('sprites', 'spritesSVG', 'symbolsSVG'),
    parallel('sass', 'images', 'i', 'fonts', 'js:prod'),
    'pug',
    'watch'
  )
)

// js:dev не нужен он запускается в ExpressJs
task(
  'dev',
  series(
    'clean-all',
    parallel('sprites', 'spritesSVG', 'symbolsSVG'),
    parallel('sass', 'pug', 'watch', 'browser-sync')
  )
)

task('minify', series(parallel('isMinify', 'isNoBs', 'isNoWatch'), 'default'))

task('build', series(parallel('isNoBs', 'isNoWatch'), 'default'))

task(
  'zip',
  series(
    'clean-all',
    'isNoBs',
    'isNoWatch',
    parallel('sprites', 'spritesSVG', 'symbolsSVG'),
    parallel('sass', 'images', 'i', 'fonts', 'js:prod'),
    'pug',
    'zipArchive'
  )
)
