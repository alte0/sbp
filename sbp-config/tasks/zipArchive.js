import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import zip from 'gulp-zip';

export function zipArchive() {
  return src('dist/**/*.*')
    .pipe(plumber())
    .pipe(zip('archive.zip'))
    .pipe(dest('dist'))
}
