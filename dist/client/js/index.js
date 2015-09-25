require.config({
	paths: {
		epik: '../../bower_components/epik/lib',
		'rivets-adapter': '../../bower_components/epik/lib/plugins/rivets-adapter',
		primish: '../../bower_components/primish',
		lodash: '../../bower_components/lodash/lodash',
		slicker: '../../bower_components/slicker/index',
		rivets: '../../bower_components/rivets/dist/rivets',
		jquery: '../../bower_components/jquery/dist/jquery',
		big: '../../bower_components/big.js/big.min',
		io: '/socket.io/socket.io',
		text: '../../bower_components/requirejs-text/text',
		moment: '../../bower_components/momentjs/moment'
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
	var pairsVC = require('./views/pairs-vc'),
		tradesVC = require('./views/trades-vc');

	new pairsVC({
		element: '.controls'
	});

	new tradesVC({
		element: '.trades'
	});
});
