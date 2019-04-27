const { src, dest, parallel, watch } = require("gulp");
const imagemin = require("gulp-imagemin");
const filesize = require("gulp-filesize");
const plumber = require("gulp-plumber");

const taskWrapper = (config, sync) => {

  const srcFiles = config.images.src.map(file => config.src + "/" + file);

  const task = cb => {
    src(srcFiles)
        .pipe(plumber())
        .pipe(filesize())
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 7}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false},
                    {removeTitle: true}
                ]
            })
        ]))
        .pipe(dest(config.dest + '/' + config.images.dest))
        .pipe(filesize());
    cb();
  }

  if (config.watch)
    watch(config.images.watch.map(file => config.src + '/' + file), { events: 'change'}, (cb) => {
        task(cb);
        sync.reload(cb);
    });


  return task;
};

module.exports = taskWrapper;
