const path = require('path');
const { src, dest } = require('gulp');
const pug = require('gulp-pug');

module.exports = config => () => {
  const srcFiles = config.pug.src.map(file => config.src + '/' + file);
  return src(srcFiles)
    .pipe(pug(config.pug.settings || {}))
    .pipe(dest(path.join(config.dest, config.pug.dest)))
}