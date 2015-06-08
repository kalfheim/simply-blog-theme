module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    concat: {
      plugins: {
        src: [
          /* jQuery. */
          // 'bower_components/jquery/dist/jquery.js',

          /* OctoberCMS Framework. */
          // '../../modules/system/assets/js/framework.js',
          // '../../modules/system/assets/js/framework.extras.js'
        ],
        dest: 'assets/js-dist/plugins.js'
      }
    },

    jshint: {
      app: {
        options: {
          jshintrc: 'assets/js/.jshintrc'
        },
        src: 'assets/js/**/*.js'
      }
    },

    jscs: {
      app: {
        options: {
          config: 'assets/js/.jscsrc'
        },
        src: '<%= jshint.app.src %>'
      }
    },

    uglify: {
      options: {
        compress: {
          warnings: false
        },
        mangle: true,
        preserveComments: 'some'
      },

      // plugins: {
      //   files: {
      //     'assets/js-dist/plugins.min.js': [
      //       'assets/js-dist/plugins.js'
      //     ]
      //   }
      // },

      app: {
        options: {
          sourceMap: true
        },
        files: {
          'assets/js-dist/app.min.js': [
            'assets/vendor/highlightjs/highlight.js',
            'assets/js/app.js'
          ]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 7,
          progressive: true,
          use: [require('imagemin-mozjpeg')()]
        },
        files: [{
          expand: true,
          cwd: 'assets/images/',
          src: ['**/*.{png,jpg,jpeg,gif,svg}'],
          dest: 'assets/images/'
        }]
      }
    },

    sass: {
      options: {
        sourceMap: true,
        sourceComments: false,
        outputStyle: 'compressed'
      },
      app: {
        files: {
          'assets/css/app.css': 'assets/scss/app.scss'
        }
      }
    },

    scsslint: {
      options: {
        config: 'assets/scss/.scss-lint.yml',
        colorizeOutput: true
      },

      app: [
        'assets/scss/**/*.scss'
      ]
    },

    postcss: {
      options: {
        map: {
          inline: false,
          prev: 'assets/css/'
        },
        processors: [
          require('autoprefixer-core')({browsers: [
            'last 2 versions', 'ie 8', 'ie 9'
          ]}),
          require('csswring')
        ]
      },

      app: {
        src: 'assets/css/app.css'
      }
    },

    watch: {
      options: {
        livereload: {
          port: 35729
        }
      },

      js: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app', 'uglify:app']
      },

      sass: {
        files: 'assets/scss/**/*.scss',
        tasks: ['scsslint:app', 'sass:app']
      },

      twig: {
        files: '{content,layouts,pages,partials}/**/*.htm'
        // Just to trigger livereload.
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask(
    'css',
    'Compile LESS to CSS and run postcss for production.',
    ['sass:app', 'postcss:app']
  );

  grunt.registerTask(
    'images',
    'Run imagemin on images.',
    ['imagemin:images']
  );

  grunt.registerTask(
    'default',
    'Build the theme for production.',
    ['css', 'images']
  );

  grunt.registerTask(
    'dev',
    'Development mode',
    ['watch']
  );
};
