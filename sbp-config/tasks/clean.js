
import del from 'del';
import path from '../path';

export function cleanTask () {
  return del(path.cleanFolder);
}

export function cleanDevTask () {
  return cleanTask();
  // return del([`${path.cleanHtml}`, `${path.cleanJs}`, `${path.cleanCss}`, `${path.dev.sprite}`, `${path.dev.spriteSvg}`, `${path.dev.symbolsSvg}`]);
}

export function delTask (path) {
  return del(path);
}
