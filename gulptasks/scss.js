const { src, dest, watch } = require('gulp');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const filesize = require('gulp-filesize');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglifycss');
const rename = require('gulp-rename');
const plumber = require("gulp-plumber");

const needWatch = process.argv.indexOf("--watch") !== -1;

const taskWrapper = (config, sync) => {
    const srcFiles = config.scss.src.map(file => config.src + '/' + file);
    const destPath = config.dest + '/' + config.scss.dest;

    const task = (cb) => {
        src(srcFiles)
            .pipe(plumber())
            .pipe(gulpif(config.scss.sourcemaps, sourcemaps.init()))
            .pipe(scss(config.scss.settings || {}).on('error', scss.logError))
            .pipe(gulpif(config.scss.sourcemaps, sourcemaps.write()))
            .pipe(postcss([
                autoprefixer({
                    browsers: ['last 3 versions'],
                    cascade: false
                })
            ]))
            .pipe(dest(destPath)) 
            .pipe(filesize())
            .pipe(gulpif(config.scss.uglify, uglify()))
            .pipe(gulpif(config.scss.uglify, rename({ extname: '.min.css' })))
            .pipe(gulpif(config.scss.uglify, dest(destPath)))
            .pipe(gulpif(config.scss.uglify, filesize()));
        cb();
    }


    if (needWatch)
        watch(config.scss.watch.map(file => config.src + '/' + file), { events: 'change'}, (cb) => {
            task(cb);
            sync.reload(cb);
        });
     
    return task;
}


module.exports = taskWrapper;