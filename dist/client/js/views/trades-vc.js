define(function(require){
	'use strict';

	var primish = require('epik/index').primish,
		view = require('epik/view'),
		model = require('epik/model'),
		collection = require('epik/collection'),
		rivets = require('epik/plugins/rivets-adapter'),
		tpl = require('text!../../templates/trades.html'),
		transport = require('../transport'),
		trade = primish({
			extend: model,
			defaults: {
				currency: '',
				amount: 0,
				direction: '',
				timestamp: Date.now(),
				traderId: 0
			}
		}),
		Trades = primish({
			extend: collection,
			model: trade
		}),
		moment = require('moment');


	return primish({

		extend: view,

		implement: rivets,

		constructor: function(options){
			this.rivets.formatters.date = function(value){
				return moment(value).calendar();
			};

			this.trades = new Trades([]);
			this.parent('constructor', options);
		},

		attachEvents: function(){
			var trades = this.trades;
			this.render();
			transport.subscribe('trades', function(tradesFlat){
				trades.set(tradesFlat);
			});
			this.bindRivets(this);
		},

		render: function(){
			this.$element.html(tpl);
		}

	});

});
