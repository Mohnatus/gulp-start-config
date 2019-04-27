

module.exports = {
  src: 'src',
  dest: 'dist',
  watch: true,

  tasks: {
    pug: true,
    html: true,
    scss: true,
    es: true,
    images: true
  },

  pug: {
    src: ['pug/pages/**/*.pug'],
    watch: ['pug/**/*.*'],
    settings: {
      pretty: true,
      locals: {
        helloText: "hello, world!!!"
      },
    },
    dest: ''
  },

  scss: {
    src: ['scss/**/*.*'],
    watch: ['scss/**/*.*'],
    settings: {
      outputStyle: 'compressed', // 'compressed', 'nested', 'expanded', 'compact'
      indentType: 'space', // 'space', 'tab'
      indentWidth: 2,
      linefeed: 'lf', // 'cr', 'crlf', 'lf', 'lfcr'
    },
    dest: 'css',
    //sourcemaps: true,
  },

  js: {
    src: 'js',
    watch: ['js/**/*.*'],
    groups: [
      {
        name: 'libs.js',
        files: ['libs/**/*.*'],
        uglify: false,
      },
      {
        name: 'bundle.js',
        files: ['scripts/**/*.*'],
        uglify: true,
      }
    ],
    settings: {},
    sourcemaps: true,
    dest: 'js'
  }
};