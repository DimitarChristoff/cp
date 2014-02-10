;(function(factory){
	if (typeof define == 'function' && define.amd){
		define(['epik/index'], factory);
	} else if (typeof module != 'undefined' && module.exports){
		module.exports = factory(
			require('epik')
		);
	}
}).call(this, function(epik){

	// currency pair model
	return epik.primish({

		extend: epik.model,

		defaults: {
			base: 0,
			ask: 0,
			bid: 0,
			cp: ''
		},

		tick: function(){

		}

	});
});

