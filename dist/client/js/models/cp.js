;(function(factory){
	if (typeof define == 'function' && define.amd){
		define(['epik/index', 'epik/model'], factory);
	} else if (typeof module != 'undefined' && module.exports){
		module.exports = factory(
			require('epik'),
			require('epik/lib/model')
		);
	}
}).call(this, function(epik, model){

	// currency pair model
	return epik.primish({

		extend: model,

		defaults: {
			base: 0,
			ask: 0,
			bid: 0,
			cp: ''
		},

		tick: function(){
			this.set({
				base: this._attributes.base + 0.001,
				ask: this._attributes.ask + 0.001,
				bid: this._attributes.bid + 0.001
			});
		}

	});
});

