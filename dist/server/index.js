var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	path = require('path');

// var io = require('socket.io').listen(8080);

app.use(express.logger('dev'));
app.use(express.bodyParser());

//app.use(express.static('dist/example'));
app.use('/', express.static(path.resolve('../dist')));

var currencyPairModel = require('../client/js/models/cp');
console.log(typeof currencyPairModel, currencyPairModel+'');

io.sockets.on('connection', function(socket){
	var glob = require('glob');

	var model = new currencyPairModel({
		base: 1.1990,
		ask: 1.2123,
		bid: 1.1890,
		cp: 'GBPEUR'
	});

	console.log(Object.keys(model));

	socket.on('cp:start', function(){

		setInterval(function(){
			model.tick();
		}, 200);

		model.on('change', function(){
			socket.emit('cp:change', model._attributes);
		});
	});
});

exports = module.exports = server;
// delegates user() function
exports.use = function(){
	app.use.apply(app, arguments);
};