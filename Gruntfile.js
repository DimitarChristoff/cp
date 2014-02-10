'use strict';

var path = require('path');

module.exports = function(grunt){
	grunt.initConfig({
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
		}
	});

	//require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask('default', ['express', 'express-keepalive']);
};
