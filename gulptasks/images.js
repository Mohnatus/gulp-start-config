const { src, dest, parallel, watch } = require("gulp");
const imagemin = require("gulp-imagemin");
const filesize = require("gulp-filesize");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const pngquant = require("pngquant");
const plumber = require("gulp-plumber");

const needWatch = process.argv.indexOf("--watch") !== -1;

const taskWrapper = (config, sync) => {

  const srcFiles = config.images.src.map(file => config.src + "/" + file);

  const task = cb => {
    src(srcFiles)
        .pipe(plumber())
        .pipe(filesize())
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imageminJpegRecompress({
                loops: 5,
                min: 65,
                max: 70,
                quality:'medium',
                method: 'smallfry'
            }),
            imagemin.optipng({optimizationLevel: 7}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false},
                    {removeTitle: true}
                ]
            }),
            pngquant({
                quality: '55-60',
                speed: 5
            })
        ], {
            verbose: true
        }))
        .pipe(dest(config.dest + '/' + config.images.dest))
        .pipe(filesize());
    cb();
  }

  if (needWatch)
    watch(config.images.watch.map(file => config.src + '/' + file), { events: 'change'}, (cb) => {
        task(cb);
        sync.reload(cb);
    });


  return task;
};

module.exports = taskWrapper;
