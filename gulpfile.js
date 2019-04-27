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

exports.pug = pugTask;
exports.scss = scssTask;
exports.js = jsTask;

exports.default = series(cleanTask, pugTask, scssTask, jsTask, serveTask);