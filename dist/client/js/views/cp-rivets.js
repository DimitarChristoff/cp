define(function(require){
	var primish = require('epik/index').primish,
		view = require('epik/view'),
		rivets = require('epik/plugins/rivets-adapter');

	return primish({
		implement: [rivets],
		extend: view,
		constructor: function(options){
			this.parent('constructor', options);
			this.attachEvents();
		},
		attachEvents: function(){
			var bound = {
				rate: this.model
			};

			this.bindRivets(bound);
		}
	});
});
