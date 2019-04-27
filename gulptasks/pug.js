const { src, dest, watch } = require('gulp');
const pug = require('gulp-pug');

const taskWrapper = config => {
  const srcFiles = config.pug.src.map(file => config.src + '/' + file);

  const task = cb => {
    src(srcFiles)
      .pipe(pug(config.pug.settings || {}))
      .pipe(dest(config.dest + '/' + config.pug.dest));
    cb();
  }

  console.log(config.pug.watch.map(file => config.src + '/' + file))
  if (config.watch)
    watch(config.pug.watch.map(file => config.src + '/' + file), task);


  return task;
}

module.exports = taskWrapper;