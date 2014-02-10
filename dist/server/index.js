var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	path = require('path');

// var io = require('socket.io').listen(8080);

app.use(express.logger('dev'));
app.use(express.bodyParser());

//app.use(express.static('dist/example'));
app.use('/lib/', express.static(path.resolve('../client')));

var currencyPairModel = require('../client/js/models/cp');


io.sockets.on('connection', function(socket){
	var glob = require('glob');

	socket.on('demos:get', function(){
		glob('dist/example/js/*.js', function(er, files){
			files.sort();
			files = files.map(function(file){
				file = path.basename(file);
				return {
					route: '#!' + path.basename(file, '.js'),
					name: file,
					title: path.basename(file, '.js')
				};
			});
			socket.emit('demos:get', files);
		});
	});
});

exports = module.exports = server;
// delegates user() function
exports.use = function(){
	app.use.apply(app, arguments);
};