const config = require('./config.js');

const { series } = require('gulp');

const sync = require('browser-sync').create();
const serveTask = (cb) => {
  sync.init({
    server: config.dest
  });
  cb();
};

const del = require('delete');
const cleanTask = (cb) => {
  del([config.dest + '/**/*.*'], cb);
};

const pug = require('./gulptasks/pug.js')(config, sync);
const scss = require('./gulptasks/scss.js')(config, sync);
const js = require('./gulptasks/js.js')(config, sync);
const images = require('./gulptasks/images.js')(config, sync);
const assets = require('./gulptasks/assets.js')(config, sync);

const tasks = {
  clean: cleanTask,
  pug: pug,
  scss: scss,
  js: js,
  images: images,
  assets: assets,
  serve: serveTask
};

module.exports = tasks;

module.exports.default = series(
  cleanTask, 
  ...['pug', 'scss', 'js', 'images', 'assets'].filter(name => config[name]).map(name => tasks[name]),
  serveTask
);

//gulp-htmlhint gulp-load-plugins gulp-sprite gulp-rev-mtime gulp-changed gulp-svgmin gulp-git-deploy