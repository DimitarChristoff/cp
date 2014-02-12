'use strict';

var path = require('path');

module.exports = function(grunt){
	grunt.initConfig({
		project: {
			less: [
				'dist/less/pairs.less'
			]
		},

		express: {
			epik: {
				options: {
					server: path.resolve('dist/server/index'),
					port: 8000,
					bases: [path.resolve('dist'), path.resolve('lib')],
					serverreload: true,
					livereload: true
					//background: !true
				}
			}
		},

		less: {
			epik: {
				files: {
					'dist/client/css/pairs.css': '<%= project.less %>'
				}
			}
		},

		open: {
			epik: {
				path: 'http://localhost:8000'
			}
		}
	});

	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('default', [
		'less',
		'express',
		'express-keepalive',
		'open'
	]);
};
