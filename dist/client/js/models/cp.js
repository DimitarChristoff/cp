;(function(factory){
	if (typeof define == 'function' && define.amd){
		define([
			'epik/index',
			'epik/model',
			'big'
		], factory);
	} else if (typeof module != 'undefined' && module.exports){
		module.exports = factory(
			require('epik'),
			require('epik/lib/model'),
			require('big.js')
		);
	}
}).call(this, function(epik, model, big){

	var spreads = {
		AUDBGN: 4,
		AUDCHF: 2,
		AUDEUR: 1,
		AUDGBP: 4,
		AUDJPY: 1.4,
		AUDUSD: 0.8,
		AUDZAR: 54,
		BGNAUD: 4,
		BGNCHF: 3,
		BGNEUR: 0.5,
		BGNGBP: 2,
		BGNJPY: 2,
		BGNUSD: 2,
		BGNZAR: 56,
		CHFAUD: 2,
		CHFBGN: 3,
		CHFEUR: 1,
		CHFGBP: 1,
		CHFJPY: 1,
		CHFUSD: 0.8,
		CHFZAR: 60,
		EURAUD: 1,
		EURBGN: 1,
		EURCHF: 1,
		EURGBP: 1,
		EURJPY: 1,
		EURUSD: 1,
		EURZAR: 57,
		GBPAUD: 1,
		GBPBGN: 2,
		GBPCHF: 1,
		GBPEUR: 1,
		GBPJPY: 2,
		GBPUSD: 1,
		GBPZAR: 58,
		JPYAUD: 1,
		JPYBGN: 1,
		JPYCHF: 1,
		JPYEUR: 12,
		JPYGBP: 2,
		JPYUSD: 6,
		JPYZAR: 52,
		USDAUD: 1,
		USDBGN: 2,
		USDCHF: 1,
		USDEUR: 1,
		USDGBP: 1,
		USDJPY: 1,
		USDZAR: 61,
		ZARAUD: 54,
		ZARBGN: 56,
		ZARCHF: 60,
		ZAREUR: 57,
		ZARGBP: 58,
		ZARJPY: 52,
		ZARUSD: 61
	};

	var map = ['plus', 'minus'];

	var _ = epik._;

	// currency pair model
	var cp = epik.primish({

		extend: model,

		options: {
			refreshMin: 100,
			refreshMax: 2000
		},

		defaults: {
			title: '',
			formatter: '0.0000',
			bid: 0,
			ask: 0,
			oldBid: 0,
			oldAsk: 0,
			changeBid: '',
			changeAsk: ''
		},

		tick: function(){
			var diff = _.random(this.maxPips / 2, this.maxPips, true),
				base = big(this._attributes.base)[map[_.random(0,1)]](diff),
				obj = {
					base: base.toFixed()
				},
				change = (Number(obj.base) / 100 * _.random(0, 0.2, true) / 100).toFixed(obj.base.split('.')[1].length);

			obj.bid = base.plus(change).toFixed();
			obj.ask = base.minus(change).toFixed();

			obj.oldBid = this._attributes.bid;
			obj.oldAsk = this._attributes.ask;

			this.set(obj);
		},

		formatPrice: function(price){
			var obj = {},
				dot = price.indexOf('.'),
				len = 4;

			if (dot >= 3){
				price = price.replace('.', '');
				len = 3;
			}

			obj.one = price.substring(0, len);
			obj.two = price.substring(len, len + 2);
			// this is wrong as it does not round.
			obj.three = price.substring(len + 2, len + 3);

			return obj;
		},

		constructor: function(data){
			this.parent('constructor', data);
			this.set('spread', spreads[this.get('title')] || 1);

			this.formatter = this.get('formatter').replace(/[1-9]/g, '0');
			this.set('formatter', null, true);
			this.maxPips = Number(this.formatter.substring(0, this.formatter.length - 2) + _.random(50,70));
		}

	});


	return cp;
});

