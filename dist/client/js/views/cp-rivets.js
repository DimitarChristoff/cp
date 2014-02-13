define(function(require){
	'use strict';

	var primish = require('epik/index').primish,
		view = require('epik/view'),
		rivets = require('epik/plugins/rivets-adapter'),
		tpl = require('text!../../templates/cp.html');

	return primish({

		// super
		extend: view,

		// with rivets
		implement: [rivets],

		constructor: function(options){
			this.parent('constructor', options);

		},

		/* called automatically by View proto */
		attachEvents: function(){
			var model = this.model,
				_a = model._attributes,
				bound = {
					rate: model,
					bid: {one:0,two:0,three:0},
					ask: {one:0,two:0,three:0}
				};

			var pair = document.createElement('div');
			pair.className = 'col-xs-4 col-md-4';
			pair.innerHTML = tpl;
			this.$element.append(pair);
			this.bindRivets(pair, bound);

			// when the model changes
			this.model.on('change:ask', function(){
				bound.ask = model.formatPrice(_a.ask);
				bound.bid = model.formatPrice(_a.bid);
				bound.ask.className = _a.ask < _a.oldAsk ? 'down': 'up';
				bound.bid.className = _a.bid < _a.oldBid ? 'down': 'up';
			});
		}
	});
});
