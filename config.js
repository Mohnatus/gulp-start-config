

module.exports = {
  src: 'src',
  dest: 'dist',

  tasks: {
    pug: true,
    html: true,
    scss: true,
    es: true,
    images: true
  },

  pug: {
    src: 'pug/pages/**.pug',
    settings: {
      pretty: true,
      locals: {
        helloText: "hello, world!!!"
      },
    },
    dest: ''
  },

  scss: {
    src: 'scss/**.*',
    settings: {
      outputStyle: 'compressed', // 'compressed', 'nested', 'expanded', 'compact'
      indentType: 'space', // 'space', 'tab'
      indentWidth: 2,
      linefeed: 'lf', // 'cr', 'crlf', 'lf', 'lfcr'
    },
    dest: 'css',
    sourcemaps: true,
  },

  js: {
    src: 'js',
    groups: [
      {
        name: 'libs.js',
        files: ['libs/**.*']
      },
      {
        name: 'bundle.js',
        files: ['scripts/**.*']
      }
    ],
    settings: {},
    sourcemaps: true,
    dest: 'js'
  }
};