import flags from '../flags';

export function minifyTask (done) {
  flags.minify = true;
  console.log('=========> Minify - ', flags.minify);
  done();
}

export function noWatchTask (done) {
  flags.watch = false;
  console.log('=========> Watching - ', flags.watch);
  done();
}

export function noBsTask (done) {
  flags.bs = false;
  console.log('=========> BrowserSync - ', flags.bs);
  done();
}

export function SetComressImages (done) {
  flags.compressImage = true;
  console.log('=========> Compress images (src/images/) - ', flags.bs);
  done();
}
