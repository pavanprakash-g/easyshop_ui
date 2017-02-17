module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ['www']
    },

    browserify: {
      dist: {
        src: 'app/index.js',
        dest: 'www/index.js',
        options: {
          watch: true,
          transform: [['babelify', {presets: ["react", "es2015"]}]]
        }
      }
    },
    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },
    copy: {
      html: {
        src: 'app/index.html',
        dest: 'www/index.html'
      },
      js: {
        src: 'app/index.js',
        dest: 'www/index.js  '
      },
      fonts: {
        expand: true,
        flatten: true,
        src: ['app/fonts/**'],
        dest: 'www/fonts/',
        filter: 'isFile'
      },
       images: {
        expand: true,
        flatten: true,
        src: 'app/images/*',
        dest: 'www/images/',
        filter: 'isFile'
      }
    },
    connect: {
      server: {
        options: {
          port: 8001,
          base: 'www'
        }
      }
    },
    sass: {
      dist: {
        src: 'app/styles/index.scss',
        dest: 'www/styles/index.css',
        options: {
          includePaths: ['bower_components']
        }
      }
    },
    watch: {
      js: {
        files: ['app/**/*.html', 'app/**/*.jsx', 'app/**/*.js'],
        tasks: ['browserify']
      },
      css: {
        files: ['app/**/*.scss'],
        tasks: ['sass']
      }
    }

  });
  grunt.registerTask('default', ['clean', 'browserify', 'copy', 'connect:server', 'sass', 'watch', 'browserify']);

}
