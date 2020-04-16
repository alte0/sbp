
import { src, dest } from 'gulp';
import tap from 'gulp-tap';
import posthtml from 'gulp-posthtml';
import bem from 'posthtml-bem';
import include from 'posthtml-include';
import extend from 'posthtml-extend';
import expressions from 'posthtml-expressions';
import plumber from 'gulp-plumber';
import bs from 'browser-sync';
import gulpif from 'gulp-if';
import beautify from 'posthtml-beautify';
import fileinclude from 'gulp-file-include';
import flags from '../flags';
import * as pathConf from '../path';
import valid from 'gulp-html-validate';

export function htmlTask() {
  let path = './src/html/blocks/';

  const configBem = {
    elemPrefix: '__',
    modPrefix: '_',
    modDlmtr: '-',
  };
  const configInclude = {
    root: `${path}`,
    // root: `./src/html/blocks/`,
    encoding: 'utf8',
  };
  const configExtend = {
    encoding: 'utf8', // Parent template encoding (default: 'utf8')
    root: './src/html/layout/', // Path to parent template directory (default: './')
  };
  const configBeautify = {
    rules: {
      indent: 2,
      blankLines: false,
    },
  };

  const plugins = [
    include(configInclude),
    extend(configExtend),
    expressions(),
    bem(configBem),
    beautify(configBeautify)
  ];
  const options = {};

  return src(pathConf.src.html)
    .pipe(plumber())
    .pipe(tap((file) => (path = file.path)))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/data-json/',
    }))
    .pipe(posthtml(plugins, options))
    .pipe(gulpif(flags.watch, dest(pathConf.dev.html)))
    .pipe(gulpif(!flags.watch, dest(pathConf.build.html)))
    .pipe(valid())
    .pipe(gulpif(flags.bs, bs.stream()));
}
