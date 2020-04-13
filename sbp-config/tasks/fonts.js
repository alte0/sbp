
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import path from '../path.js';

export function fontsTask() {
  return src(path.src.fonts)
    .pipe(plumber())
    .pipe(dest(path.build.fonts));
}
