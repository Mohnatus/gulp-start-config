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

const pugTask = require('./gulptasks/pug.js')(config, sync);
const scssTask = require('./gulptasks/scss.js')(config, sync);
const jsTask = require('./gulptasks/js.js')(config, sync);
const imagesTask = require('./gulptasks/images.js')(config, sync);
const assetsTask = require('./gulptasks/assets.js')(config, sync);

exports.clean = cleanTask;

exports.pug = pugTask;
exports.scss = scssTask;
exports.js = jsTask;
exports.images = imagesTask;
exports.assets = assetsTask;

exports.default = series(cleanTask, pugTask, scssTask, jsTask, imagesTask, serveTask, assetsTask);

//gulp-htmlhint gulp-load-plugins gulp-sprite gulp-rev-mtime gulp-changed gulp-svgmin gulp-git-deploy