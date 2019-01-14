const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const path = require('../path.js');
const flags = require('../flags.js');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');

gulp.task('images', function() {
  return gulp
    .src(path.src.images)
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true, optimizationLevel: 1 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupAttrs: true },
            { removeEmptyAttrs: true },
            { removeComments: true },
            { removeEditorsNSData: true },
            { convertColors: true },
            { cleanupIDs: false }
          ]
        })
      ])
    )
    .pipe(gulp.dest(path.dist.images))
    .pipe(gulpif(flags.watch, browserSync.stream()))
})
