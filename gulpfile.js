'use strict';

const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const path = require('./sbp-config/path.js');
const flags = require('./sbp-config/flags.js');
const watch = require('gulp-watch');

/* load some files into the registry */
const hub = new HubRegistry(['./sbp-config/tasks/*.js']);

/* tell gulp to use the tasks just loaded */
gulp.registry(hub);

// ===========================================
// watching tasks
// ===========================================
gulp.task('watch', function(cb) {
  if (flags.watch) {
    watch([path.watch.css], gulp.series('sass'));
    watch([path.watch.sprites], gulp.series('sprites'));
    watch([path.watch.spritesSvg], gulp.series('spritesSVG'));
    watch([path.watch.spritesSymbolSvg], gulp.series('spritesSymbolsSVG'));
  } else {
    console.log('=========> WATCH - OFF!');
  }

  if (!flags.bs && flags.watch) {
    watch([path.watch.html], gulp.series('pug'));
    watch([path.watch.js], gulp.series('js:prod'));
    watch([path.watch.images], gulp.series('images'));
    watch([path.watch.i], gulp.series('i'));
    watch([path.watch.fonts], gulp.series('fonts'));
  }

  cb();
});
// ===========================================
// Main tasks
// ===========================================
gulp.task("default",
    gulp.series( 'clean-all', 'isNoBs',
        gulp.parallel(
            "sprites",
            "spritesSVG",
            "spritesSymbolsSVG"
        ),
        gulp.parallel(
            'sass',
            'images',
            'i',
            'fonts',
            'js:prod'
        ),
        'pug', 'watch'
    )
);

// js:dev не нужен он запускается в ExpressJs
gulp.task('dev',
  gulp.series(
    'clean-all',
    gulp.parallel(
        'sprites',
        'spritesSVG',
        'spritesSymbolsSVG'
    ),
    gulp.parallel(
        'sass',
        'pug',
        'watch',
        'browser-sync'
    )
  )
);

gulp.task('minify', gulp.series(gulp.parallel('isMinify', 'isNoBs', 'isNoWatch'), 'default'));

gulp.task('build', gulp.series(gulp.parallel('isNoBs', 'isNoWatch'), 'default'));

gulp.task('zip',
  gulp.series(
    'clean-all',
    'isNoBs',
    'isNoWatch',
    gulp.parallel(
        'sprites',
        'spritesSVG',
        'spritesSymbolsSVG'
    ),
    gulp.parallel(
        'sass',
        'images',
        'i',
        'fonts',
        'js:prod'
    ),
    'pug',
    'zipArchive'
  )
);

