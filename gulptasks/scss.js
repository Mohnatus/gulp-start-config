const { src, dest, watch } = require('gulp');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const taskWrapper = config => {
    const srcFiles = config.scss.src.map(file => config.src + '/' + file);
    const destPath = config.dest + '/' + config.scss.dest;

    const task = (cb) => {
        src(srcFiles)
            .pipe(gulpif(config.scss.sourcemaps, sourcemaps.init()))
            .pipe(scss(config.scss.settings || {}).on('error', scss.logError))
            .pipe(gulpif(config.scss.sourcemaps, sourcemaps.write()))
            .pipe(dest(destPath)); 
        cb();
    }

    console.log(config.scss.watch.map(file => config.src + '/' + file))
    if (config.watch)
        watch(config.scss.watch.map(file => config.src + '/' + file), task);
     
    return task;
}


module.exports = taskWrapper;