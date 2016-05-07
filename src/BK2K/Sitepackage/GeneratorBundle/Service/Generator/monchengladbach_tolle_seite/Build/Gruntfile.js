module.exports = function(grunt) {

    /**
     * Project configuration.
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            root: '../',
            bower: 'bower_components/',
            resources: '<%= paths.root %>Resources/',
            contrib: '<%= paths.resources %>Public/Contrib/',
            less: '<%= paths.resources %>Public/Less/',
            css: '<%= paths.resources %>Public/Css/',
            fonts: '<%= paths.resources %>Public/Fonts/',
            img: '<%= paths.resources %>Public/Images/',
            js: '<%= paths.resources %>Public/JavaScript/'
        },
        banner: '/*!\n' +
            ' * MonchengladbachTolleSeite v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',
        uglify: {
            all: {
                options: {
                    banner: '<%= banner %>',
                    mangle: true,
                    compress: true,
                    beautify: false
                },
                files: {
                    "<%= paths.js %>/Dist/MonchengladbachTolleSeite.js": [
                        "<%= paths.js %>Src/main.js"
                    ]
                }
            }
        },
        less: {
            layout: {
                options: {
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'layout.css.map',
                    sourceMapFilename: '<%= paths.css %>layout.css.map'
                },
                src: '<%= paths.less %>theme.less',
                dest: '<%= paths.css %>layout.css'
            }
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: [
                            'Last 2 versions',
                            'Firefox ESR',
                            'IE 9'
                        ]
                    })
                ]
            },
            theme: {
                src: '<%= paths.css %>layout.css'
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: '*',
                advanced: false
            },
            layout: {
                src: '<%= paths.css %>layout.css',
                dest: '<%= paths.css %>layout.min.css'
            }
        },
        bowercopy: {
            options: {
                clean: false,
                report: false,
                runBower: false,
                srcPrefix: '<%= paths.bower %>',
                destPrefix: '<%= paths.contrib %>'
            }
        },
        watch: {
            less: {
                files: '<%= paths.less %>**/*.less',
                tasks: ['css']
            },
            javascript: {
                files: '<%= paths.js %>Src/**/*.js',
                tasks: ['js']
            }
        }
    });

    /**
     * Register tasks
     */
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    /**
     * Grunt update task
     */
    grunt.registerTask('css', ['less', 'postcss', 'cssmin']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('build', ['js', 'css']);
    grunt.registerTask('default', ['build']);

};
