const { src, dest, watch } = require('gulp');
const pug = require('gulp-pug');
const filesize = require('gulp-filesize');
const plumber = require("gulp-plumber");

const needWatch = process.argv.indexOf("--watch") !== -1;

const taskWrapper = (config, sync) => {
  const srcFiles = config.pug.src.map(file => config.src + '/' + file);

  const task = cb => {
    src(srcFiles)
      .pipe(plumber())
      .pipe(pug(config.pug.settings || {}))
      .pipe(dest(config.dest + '/' + config.pug.dest))
      .pipe(filesize());
    cb();
  }

  if (needWatch)
    watch(config.pug.watch.map(file => config.src + '/' + file), { events: 'change'}, (cb) => {
      task(cb);
      sync.reload(cb);
    });

  return task;
}

module.exports = taskWrapper;