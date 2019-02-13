'use strict'

import { task, src, dest } from 'gulp'
import path from '../path'
import flags from '../flags'
import config from '../../dev.webpack.config.js'
import plumber from 'gulp-plumber'
import browserSync from 'browser-sync'
import pug from 'gulp-pug'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import favicon from 'serve-favicon'
import express from 'express'

const app = express()
let listener, port
let compiler = webpack(config)

const initBrowserSync = function () {
  return browserSync.init({
    // Customize the Browsersync console logging prefix
    logPrefix: 'SBP',
    // Sync viewports to TOP position
    scrollProportionally: true,
    // Открывать страницу в браузере по умолчанию
    open: true,
    // true включать изменения, false перезагрузка страницы
    // injectChanges: false,
    injectChanges: true,
    // watch files ["app/css/style.css", "app/js/*.js"]
    // files: [
    //   './dist',
    //   './src/pug/**/*',
    //   './src/js/**/*',
    //   './src/fonts',
    //   './src/i',
    //   './src/images'
    // ],
    files: [
      './dist',
      './src/pug/**/*',
      './src/js/**/*'
    ],
    // Wait for 1 seconds before any browsers should try to inject/reload a file.
    // reloadDelay: 1000,
    // proxy на локальный сервер Express
    proxy: 'http://localhost:' + port,
    startPath: '/static/',
    notify: false,
    tunnel: false,
    host: 'localhost',
    port: port
  })
}

task('browser-sync', function (done) {
  if (flags.bs) {
    initBrowserSync()
  } else {
    console.log('===> Browser-Sync - OFF!')
  }
  done()
})

task('pug', function (done) {
  if (flags.bs) {
    // отключаем кеширования
    app.disable('view cache')
    // указываем какой шаблонизатор использовать
    app.set('view engine', 'pug')
    // расположение шаблонов ('src/pug')
    app.set('views', './')
    // путь до наших стилей, картинок, скриптов и т.д.
    app.use('/css', express.static('dist/css'))
    app.use('/fonts', express.static('src/fonts'))
    app.use('/i', express.static('src/i'))
    app.use('/images', express.static('src/images'))
    app.use('/images/sprite', express.static('dist/images/sprite'))
    app.use('/js', express.static('dist/js'))
    app.use('/symbol-svg', express.static('dist/symbol-svg'))
    // Tell express to use the webpack-dev-middleware and use the webpack.config.js
    // configuration file as a base.
    // const config = require('../../dev.webpack.config.js')
    // app.use(
    //   webpackDevMiddleware(webpack(config), {
    //     publicPath: config.output.publicPath
    //   })
    // )
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true, publicPath: config.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler))
    app.use(favicon('src/favicon/index.ico'))
    // роутинг на наши страницы
    app.get('/*.*', function (req, res) {
      // регулярка для получения пути до шаблона
      // \ или \. . * ноль или более в конце строки $, g - все совпадения
      const regexp = /\/|\..*$/g
      const fileName = req.url.replace(regexp, '') || 'pages'
      res.render('src/pug/' + fileName, {})
    })
    // редирект на главную страницу
    app.get('/static', function (req, res) {
      res.redirect('/pages.html')
    })

    listener = app.listen(2999)
    port = listener.address().port
  }

  if ((!flags.bs && flags.watch) || (!flags.bs && !flags.watch)) {
    return src(path.src.html)
      .pipe(plumber())
      .pipe(
        pug({
          pretty: true,
          cache: true,
          locals: { minify: flags.minify }
        })
      )
      .pipe(dest(path.dist.html))
  }

  done()
})
