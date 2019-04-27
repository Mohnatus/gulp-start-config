const { src, dest } = require('gulp');
const path = require('path');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const through = require('through2')

module.exports = config => () => {
    const srcFiles = config.scss.src.map(file => config.src + '/' + file);
    const destPath = path.join(config.dest, config.scss.dest);
    return src(srcFiles)
        .pipe(gulpif(config.scss.sourcemaps, sourcemaps.init()))
        .pipe(scss(config.scss.settings || {}).on('error', scss.logError))
        .pipe(gulpif(config.scss.sourcemaps, sourcemaps.write()))
        .pipe(dest(destPath)); 
}