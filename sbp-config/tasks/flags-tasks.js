'use strict'

import { task } from 'gulp'
import flags from '../flags'

task('isMinify', function (done) {
  flags.minify = true
  console.log('=========> Minify - ', flags.minify)
  done()
})

task('isNoWatch', function (done) {
  flags.watch = false
  console.log('=========> Watching - ', flags.watch)
  done()
})

task('isNoBs', function (done) {
  flags.bs = false
  console.log('=========> BrowserSync - ', flags.bs)
  done()
})
