

module.exports = {
  src: 'src',
  dest: 'dist',
  watch: false,

  tasks: {
    pug: true,
    html: true,
    scss: true,
    js: true,
    images: true,
    assets: true
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
      outputStyle: 'expanded', // 'compressed', 'nested', 'expanded', 'compact'
      indentType: 'space', // 'space', 'tab'
      indentWidth: 2,
      linefeed: 'lf', // 'cr', 'crlf', 'lf', 'lfcr'
    },
    dest: 'css',
    sourcemaps: true,
    uglify: true
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
        lint: true
      }
    ],
    settings: {},
    sourcemaps: true,
    dest: 'js'
  },

  images: {
    src: ['images/**/*.*'],
    watch: ['images/**/*.*'],
    dest: 'images',
    settings: {
      jpg: {},
      png: {},
      gif: {},
      svg: {}
    }
  },

  assets: {
    watch: ['data/**/*.*'],
    groups: [
      {
        files: ['data/**/*.*'],
        dest: 'data'
      }
    ]
  }
};