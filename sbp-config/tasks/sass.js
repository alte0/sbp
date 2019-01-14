const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const path = require('../path.js');
const flags = require('../flags.js');
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob');
const sassVars = require('gulp-sass-variables');
const gulpStylelint = require('gulp-stylelint');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano')

gulp.task('sass', function() {
  return (
    gulp
      .src(path.src.css)
      .pipe(plumber())
      .pipe(gulpif(flags.bs, sourcemaps.init()))
      .pipe(gulpif(flags.minify, sassVars({ $minify: true })))
      .pipe(sassGlob())
      // .pipe(sass({ includePaths: sassPaths }).on("error", sass.logError))
      .pipe(
        gulpStylelint({
          reporters: [{ formatter: 'string', console: true }]
        })
      )
      .pipe(sass().on('error', sass.logError))
      .pipe(
        autoprefixer({
          // browsers: ['last 2 versions', 'ie >= 10'],
          browsers: ['last 2 version', '> 1%', 'ie >= 10'],
          cascade: false
        })
      )
      .pipe(gulpif(flags.minify, cssnano()))
      .pipe(gulpif(flags.bs, sourcemaps.write()))
      .pipe(gulp.dest(path.dist.css))
  )
})
