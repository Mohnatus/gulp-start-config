const { src, dest, watch, parallel } = require('gulp');
const filesize = require('gulp-filesize');
const plumber = require("gulp-plumber");

const groupTask = group => (cb) => {
    src(group.files)
        .pipe(plumber())
        .pipe(dest(group.dest))
        .pipe(filesize());
    cb();
}

const taskWrapper = (config, sync) => {
    const groups = config.assets.groups.map(group => {
        group.files = group.files.map(file => config.src + '/' + file);
        group.dest = config.dest + '/' + group.dest;
        return groupTask(group);
    });

    const task = parallel(groups);

    if (config.watch) {
        watch(config.assets.watch.map(file => config.src + '/' + file), { events: 'change'}, (cb) => {
            task(cb);
            sync.reload(cb);
        });
    }
        
    return task;
};

module.exports = taskWrapper;