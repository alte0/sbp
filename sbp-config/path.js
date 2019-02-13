module.exports = {
  dist: {
    html: 'dist/',
    js: 'dist/js/',
    css: 'dist/css/',
    images: 'dist/images/',
    i: 'dist/i/',
    fonts: 'dist/fonts/',
    sprite: 'dist/images/sprite',
    spriteSvg: 'dist/',
    symbolsSvg: './dist/symbol-svg/'
  },
  src: {
    html: 'src/pug/*.pug',
    js: 'src/js/components/*.js',
    css: ['src/scss/style.scss'],
    images: 'src/images/**/*.*',
    i: 'src/i/**/*.*',
    fonts: 'src/fonts/**/*.*',
    sprites: 'src/sprites-png/*.png',
    spritesSvg: 'src/sprites-svg/*.svg',
    symbolsSvg: 'src/symbol-svg/*.svg'
  },
  watch: {
    // 'Path must be a string' for gulp-watch
    html: 'src/pug/**/*.pug',
    js: 'src/js/**/*.js',
    css: 'src/scss/**/*.scss',
    images: 'src/images/**/*.*',
    i: 'src/i/**/*.*',
    fonts: 'src/fonts/**/*.*',
    sprites: 'src/sprites-png/*.png',
    spritesSvg: 'src/sprites-svg/*.svg',
    symbolsSvg: 'src/symbol-svg/*.svg'
  },
  cleanFolder: './dist',
  cleanFolderSymbolSvg: './dist/svg'
}
