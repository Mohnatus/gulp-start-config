const { parallel, series } = require('gulp');

const config = require('./config.js');

const pugTask = require('./gulptasks/pug.js')(config);
const scssTask = require('./gulptasks/scss.js')(config);
const jsTask = require('./gulptasks/js.js')(config);

exports.pug = pugTask;
exports.scss = scssTask;
exports.js = jsTask;

exports.default = parallel(pugTask, scssTask, jsTask);