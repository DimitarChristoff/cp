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

var rates = {"AUDBGN":"1.2943","AUDCHF":"0.8104","AUDEUR":"0.6618","AUDGBP":"0.5489","AUDJPY":"92.7611","AUDUSD":"0.9041","AUDZAR":"9.9168","BGNAUD":"0.7726","BGNCHF":"0.6261","BGNEUR":"0.5113","BGNGBP":"0.4241","BGNJPY":"71.6665","BGNUSD":"0.6985","BGNZAR":"7.6617","CHFAUD":"1.2339","CHFBGN":"1.5971","CHFEUR":"0.8167","CHFGBP":"0.6773","CHFJPY":"114.4621","CHFUSD":"1.1156","CHFZAR":"12.2368","EURAUD":"1.511","EURBGN":"1.9557","EURCHF":"1.2245","EURGBP":"0.8294","EURJPY":"140.16","EURUSD":"1.366","EURZAR":"14.9841","GBPAUD":"1.8218","GBPBGN":"2.3581","GBPCHF":"1.4764","GBPEUR":"1.2057","GBPJPY":"168.9966","GBPUSD":"1.6471","GBPZAR":"18.0669","JPYAUD":"0.0108","JPYBGN":"0.014","JPYCHF":"0.0087","JPYEUR":"0.0071","JPYGBP":"0.0059","JPYUSD":"0.0097","JPYZAR":"0.1069","USDAUD":"1.1061","USDBGN":"1.4317","USDCHF":"0.8964","USDEUR":"0.7321","USDGBP":"0.6071","USDJPY":"102.605","USDZAR":"10.9692","ZARAUD":"0.1008","ZARBGN":"0.1305","ZARCHF":"0.0817","ZAREUR":"0.0667","ZARGBP":"0.0553","ZARJPY":"9.3539","ZARUSD":"0.0912"};


var collection = require('epik/lib/collection'),
	model = require('epik/lib/model'),
	primish = epik.primish,
	trade = primish({
		extend: model,
		defaults: function(){
			return {
				currency: '',
				amount: 0,
				direction: '',
				timestamp: Date.now(),
				traderId: 0
			}
		}
	}),
	Trades = primish({
		extend: collection,
		model: trade
	}),
	trades = new Trades([]);


io.sockets.on('connection', function(socket){
	var listening = [],
		currencies = new collection({
			model: currencyPairModel
		});

	trades.on('add', function(){
		socket.emit('trades', this.toJSON());
	});

	trades.trigger('add');

	socket.on('cp:start', function(currency){
		currency = currency.toUpperCase();
		if (listening.indexOf(currency) !== -1)
			return;

		var model = new currencyPairModel({
			base: rates[currency],
			title: currency
		}, {
			refreshMin: 50,
			refreshMax: 500
		}), o = model.options;

		currencies.add(model);

		var timer,
			tick = function(){
				model.tick();
				timer = setTimeout(tick, epik._.random(o.refreshMin, o.refreshMax))
			};

		tick();

		model.on('change', function(){
			socket.emit('cp:change:'+currency, model._attributes);
		});

		listening.push(currency);
	});

	socket.on('trade', function(currency, amount, direction, trader){
		trades.add({
			currency: currency,
			amount: amount,
			direction: direction,
			timestamp: Date.now(),
			traderId: trader,
			rate: currencies.findOne('[title=' + currency + ']').get(direction === 'sell' ? 'bid' : 'ask')
		});
	});

});

exports = module.exports = server;

// delegates user() function
exports.use = function(){
	app.use.apply(app, arguments);
};