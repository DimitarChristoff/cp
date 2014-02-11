var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	path = require('path'),
	epik = require('epik');

// var io = require('socket.io').listen(8080);
io.set('log level', 1);

//app.use(express.logger('dev'));
app.use(express.bodyParser());

//app.use(express.static('dist/example'));
app.use('/', express.static(path.resolve('../dist')));

var currencyPairModel = require('../client/js/models/cp');

io.sockets.on('connection', function(socket){
	var model = new currencyPairModel({
		base: 1.1990,
		title: 'GBPEUR',
		size: 100
	}, {
		refreshMin: 50,
		refreshMax: 500
	}), o = model.options;

	socket.on('cp:start', function(){

		var timer,
			tick = function(){
				model.tick();
				timer = setTimeout(tick, epik._.random(o.refreshMin, o.refreshMax))
			};

		tick();

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