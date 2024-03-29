module.exports = {
  dev: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    sprite: 'build/images/sprite',
    // spriteSvg: 'build/images/sprite-svg',
    spriteSvg: 'build',
    symbolsSvg: 'build/images/symbols-svg'
  },
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    images: 'build/images/',
    i: 'build/i/',
    fonts: 'build/fonts/',
    sprite: 'build/images/sprite',
    // spriteSvg: 'build/images/sprite-svg',
    spriteSvg: 'build',
    symbolsSvg: './build/images/symbols-svg'
  },
  src: {
    html: 'src/html/*.html',
    js: './src/js/main.js',
    css: ['src/scss/style.scss'],
    images: ['src/images/**/*.*', '!src/images/sprite/*', '!src/images/sprite-svg/*', '!src/images/symbols-svg/*'],
    i: 'src/i/**/*.*',
    fonts: 'src/fonts/**/*.*',
    sprites: 'src/sprites-png/*.png',
    spritesSvg: 'src/sprites-svg/*.svg',
    symbolsSvg: 'src/symbol-svg/*.svg'
  },
  watch: {
    html: 'src/html/**/*.html',
    dataJson: 'src/data-json/',
    js: ['src/js/main.js', 'src/js/components/**/*.js'],
    css: 'src/scss/**/*.scss',
    sprites: 'src/sprites-png/*.png',
    spritesSvg: 'src/sprites-svg/*.svg',
    symbolsSvg: 'src/symbol-svg/*.svg',
    images: ['src/images/**/*.*', '!src/images/sprite/*', '!src/images/sprite-svg/*', '!src/images/symbols-svg/*'],
    i: 'src/i/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  cleanFolder: './build'/*,
  cleanHtml: './src/!*.html',
  cleanJs: './src/js/script.js',
  cleanCss: './src/css' */
};
