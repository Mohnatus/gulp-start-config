const { src, dest, parallel } = require('gulp');
const path = require('path');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

const groupTask = group => (cb) => {
    src(group.files)
        .pipe(concat(group.name))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest(group.dest));
    cb();
}

module.exports = config => {
    const jsSrc = path.join(config.src, config.js.src);
    const groups = config.js.groups.map(group => {
        group.files = group.files.map(file => path.join(jsSrc, file));  
        group.dest = path.join(config.dest, config.js.dest);
        return groupTask(group);
    });
    return parallel(groups);
};