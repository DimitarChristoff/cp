require.config({
	paths: {
		epik: '../../bower_components/epik/lib',
		'rivets-adapter': '../../bower_components/epik/lib/plugins/rivets-adapter',
		primish: '../../bower_components/primish',
		lodash: '../../bower_components/lodash/dist/lodash',
		slicker: '../../bower_components/slicker/index',
		rivets: '../../bower_components/rivets/dist/rivets',
		jquery: '../../bower_components/jquery/jquery',
		io: '/socket.io/socket.io',
		text: '../../bower_components/requirejs-text/text'
	},
	bundles: {
		'epik/epik-min': [
			'epik/index',
			'epik/model',
			'epik/model-sync',
			'epik/collection',
			'epik/collection-sync',
			'epik/agent',
			'epik/storage',
			'epik/router',
			'epik/view',
			'epik/plugins/rivets-adapter',
			'slicker'
		]
	}
	//urlArgs: 'b=' + +new Date
});


define(function(require){
	var transport = new (require('./transport'))();

	transport.subscribe('cp:change', function(data){
		console.log(data);
	});
	transport.send('cp:start');
});