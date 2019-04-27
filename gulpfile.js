const config = require('./config.js');

const { parallel, series } = require('gulp');
const sync = require('browser-sync').create();
const serve = () => {
  sync.init({
    server: config.dest
  });
};

const pugTask = require('./gulptasks/pug.js')(config, sync);
const scssTask = require('./gulptasks/scss.js')(config, sync);
const jsTask = require('./gulptasks/js.js')(config, sync);

exports.pug = pugTask;
exports.scss = scssTask;
exports.js = jsTask;

exports.default = series(serve, parallel(pugTask, scssTask, jsTask));