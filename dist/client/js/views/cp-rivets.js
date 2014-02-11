define(function(require){
	var primish = require('epik/index').primish,
		view = require('epik/view'),
		rivets = require('epik/plugins/rivets-adapter');

	return primish({
		implement: [rivets],
		extend: view,
		constructor: function(options){
			this.parent('constructor', options);
			var format = this.model.formatPrice;
			this.rivets.formatters.price = function(value){
				return format(value.toString()).three;
			};

			this.attachEvents();
		},
		attachEvents: function(){
			var bid = {
				one: 0,
				two: 0,
				three: 0
			};
			var ask = {
				one: 0,
				two: 0,
				three: 0
			};

			var bound = {
				rate: this.model,
				bid: bid,
				ask: ask
			};

			var model = this.model;

			this.bindRivets(bound);
			this.on('model:change', function(){
				var a = model.formatPrice(model._attributes.ask),
					b = model.formatPrice(model._attributes.bid);

				ask.one = a.one;
				ask.two = a.two;
				ask.three = a.three;

				ask.className = model._attributes.ask < model._attributes.oldAsk ? 'down': 'up';

				bid.one = b.one;
				bid.two = b.two;
				bid.three = b.three;

				bid.className = model._attributes.bid < model._attributes.oldBid ? 'down': 'up';
			});
		}
	});
});
