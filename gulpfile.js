const config = require('./config.js');

const pugTask = require('./gulptasks/pug.js');
const scssTask = require('./gulptasks/scss.js');
const jsTask = require('./gulptasks/js.js');

exports.pug = pugTask(config);
exports.scss = scssTask(config);
exports.js = jsTask(config);

exports.default = parallel(pugTask, scssTask, jsTask);