import { task, src, dest } from 'gulp'
import plumber from 'gulp-plumber'
import zip from 'gulp-zip'

task('zipArchive', function () {
  return src('dist/**/*.*')
    .pipe(plumber())
    .pipe(zip('archive.zip'))
    .pipe(dest('dist'))
})
