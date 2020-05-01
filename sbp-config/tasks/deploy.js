import { src } from 'gulp';
import ghpages from 'gulp4-gh-pages';

export function deployTask () {
  return src(['./build/**/*', '!build/robots.txt'])
    .pipe(ghpages({ branch: 'gh-pages' }))
}
