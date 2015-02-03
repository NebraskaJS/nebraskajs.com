/*global module:false,require:false,console:false */
module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' MIT License */\n\n',
		config: {
			root: '', // from domain root, do not include the first slash, do include a trailing slash
			jsSrc: '<%= config.root %>js/',
			cssSrc: '<%= config.root %>css/',
			distFolder: '<%= config.root %>dist/<%= pkg.version %>/',
			distFeed: '<%- config.root %>_site/atom.xml'
		},
		yaml: {
			file: '<%= config.root %>_config.yml',
			vars: {
				safe: false,
				markdown: 'rdiscount',
				permalink: '<%= config.root %>/:year/:title/',
				highlighter: 'pygments',
				exclude: 'node_modules, README.md, build.sh, _presenters',
				distFolder: '/<%= config.distFolder %>'
			}
		},
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			js: {
				src: ['<%= config.jsSrc %>global.js'],
				dest: '<%= config.distFolder %>global.js'
			},
      sw: {
        src: ['<%= config.root %>sw.js'],
        dest: '<%= config.root %>sw.js'
      },
      polyfill: {
				src: ['<%= config.jsSrc %>cache-polyfill.js'],
				dest: '<%= config.distFolder %>cache-polyfill.js'
      },
			css: {
				src: ['<%= config.cssSrc %>global.css', '<%= config.cssSrc %>social.css'],
				dest: '<%= config.distFolder %>all.css'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			js: {
				src: '<%= concat.js.dest %>',
				dest: '<%= config.distFolder %>global.min.js'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
          Cache: true,
          CacheStorage: true,
          Request: true,
          URL: true,
          Promise: true,
          fetch: true
        }
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			js: {
				src: ['js/**/*.js']
			}
		},
		cssmin: {
			dist: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'<%= config.distFolder %>all.min.css': ['<%= config.distFolder %>all.css']
				}
			}
		},
		htmlmin: {
			main: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [
					{
						expand: true,
						cwd: '<%= config.root %>_site/',
						src: '**/*.html',
						dest: '<%= config.root %>_site/'
					}
				]
			}
		},
		compress: {
			main: {
				options: {
					mode: 'gzip'
				},
				files: [
					{
						expand: true,
						cwd: '<%= config.root %>_site/',
						src: ['**/*.html'],
						dest: '<%= config.root %>_site/',
						extDot: 'last',
						ext: '.html.zgz'
					},
					{
						expand: true,
						cwd: '<%= config.root %>_site/',
						src: ['**/*.js'],
						dest: '<%= config.root %>_site/',
						extDot: 'last',
						ext: '.js.zgz'
					},
					{
						expand: true,
						cwd: '<%= config.root %>_site/',
						src: ['**/*.css'],
						dest: '<%= config.root %>_site/',
						extDot: 'last',
						ext: '.css.zgz'
					},
					{
						expand: true,
						cwd: '<%= config.root %>_site/',
						src: ['**/*.svg'],
						dest: '<%= config.root %>_site/',
						extDot: 'last',
						ext: '.svg.zgz'
					}
				]
			}
		},
		shell: {
			jekyll: {
				command: 'jekyll build --config _config.yml --trace',
				options: {
					stdout: true,
					execOptions: {
						cwd: '<%= config.root %>'
					}
				}
			},
			// generate the pygments css file
			pygments: {
				command: 'pygmentize -S default -f html > pygments.css',
				options: {
					stdout: true,
					execOptions: {
						cwd: '<%= config.cssSrc %>'
					}
				}
			},
			presenters: {
				command: 'node fetch.js',
				options: {
					stdout: true,
					execOptions: {
						cwd: '_presenters'
					}
				}
			},
			upload: {
				command: 'echo "Note: Requires an \'nejs\' host in .ssh/config"; rsync -avz ssh ./_site/ nejs:/home/public/',
				options: {
					stdout: true,
					execOptions: {
						cwd: '<%= config.root %>'
					}
				}
			}
		},
		watch: {
			assets: {
				files: ['<%= config.cssSrc %>**/*', '<%= config.jsSrc %>**/*'],
				tasks: ['default']
			},
			content: {
				files: ['<%= config.root %>_posts/**/*', '<%= config.root %>_layouts/**/*', '<%= config.root %>speaking/**/*', '<%= config.root %>projects/**/*', '<%= config.root %>about/**/*', '<%= config.root %>license/**/*', '<%= config.root %>conduct/**/*', '<%= config.root %>presenters/**/*', '<%= config.root %>feed/**/*', '<%= config.root %>index.html', '<%= config.root %>_plugins/**/*', '<%= config.root %>_includes/**/*' ],
				tasks: ['content']
			},
			config: {
				files: ['Gruntfile.js'],
				tasks: ['config']
			}
		}
	});

	grunt.registerTask( 'yaml', function() {
		var output = grunt.config( 'yaml.file' ),
			vars = grunt.config( 'yaml.vars' ),
			fs = require('fs'),
			str = [ '# Autogenerated by `grunt config`' ];

		for( var j in vars ) {
			str.push( j + ': ' + vars[ j ] );
		}
		grunt.log.writeln( 'Writing ' + output );
		fs.writeFile( output, str.join( '\n' ), function(err) {
			if(err) {
				console.log(err);
			}
		}); 
	});

	grunt.registerTask( 'feedburner-size', function() {
		var feed = grunt.config.get( 'config.distFeed' ),
			fs = require('fs');

		var stats = fs.statSync( feed ),
			kbSize = Math.ceil( stats.size / 1024 ),
			isTooLarge = kbSize > 512,
			msg = 'Your atom.xml is ' + ( isTooLarge ? 'too large' : 'ok' ) + ' (' + kbSize + 'KB) for Feedburner (512KB max).';

		if( isTooLarge ) {
			grunt.fail.warn( msg );
		} else {
			grunt.log.writeln( msg );
		}
	});

	// Default task.
	grunt.registerTask('assets', ['jshint', 'concat:js', 'concat:sw', 'concat:polyfill', 'concat:css', 'uglify', 'cssmin']);
	grunt.registerTask('config', ['yaml']);
	grunt.registerTask('content', ['shell:jekyll', 'htmlmin', 'compress', 'feedburner-size']);
	grunt.registerTask('default', ['config', 'assets', 'content']);

	// Call manually to save API calls
	grunt.registerTask('presenters', ['shell:presenters']);

	// Upload to Production
	grunt.registerTask('deploy', ['default', 'shell:upload']);
};
