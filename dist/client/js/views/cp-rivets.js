define([
	'epik/index',
	'epik/view',
	'epik/plugins/rivets-adapter'
], function(epik, view, rivets){

	return epik.primish({
		implement: [rivets],
		extend: view,
		constructor: function(options){
			this.parent('constructor', options);
			this.attachEvents();
		},
		attachEvents: function(){
			var model = this.model,
				bound = {
					rate: this.model
				};

			this.bindRivets(bound);

			this.on('model:change', function(changed){
			});
		}
	});
});
