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
			var trades = this.trades,
				self = this;
			this.render();
			transport.subscribe('trades', function(tradesFlat){
				trades.set(tradesFlat);
				self.order && trades.sort(self.order);
			});
			this.bindRivets(this);
		},

		render: function(){
			this.$element.html(tpl);
		},

		sort: function(ev, context){
			var heading = context.$element.find(ev.currentTarget),
				how = heading.data('how'),
				isDesc = context.order == how;

			context.order = isDesc ? how + ':desc' : how;
			context.trades.sort(context.order);
			heading.parent().find('th').removeClass('active desc');
			heading.addClass('active');
			isDesc && heading.addClass('desc');
		}
	});

});
