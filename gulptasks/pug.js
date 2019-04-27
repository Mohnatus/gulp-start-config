const path = require('path');
const { src, dest } = require('gulp');
const pug = require('gulp-pug');

module.exports = config => () => {
    return src(path.join(config.src, config.pug.src))
      .pipe(pug(config.pug.settings || {}))
      .pipe(dest(path.join(config.dest, config.pug.dest)))
}