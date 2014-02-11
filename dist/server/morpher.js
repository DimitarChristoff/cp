'use strict';

var primish = require('primish'),
	options = require('primish/options'),
	emitter = require('primish/emitter'),
	big = require('big.js'),
	_ = require('epik')._;

var map = [
	'plus',
	'minus'
];

// deals with mutation of rates via spread etc.
module.exports = primish({

	implement: [options, emitter],

	options: {
		formatter: '0000.00000'
	},

	constructor: function(model, options){
		this.setOptions(options);
		this.model = model;
		this.base = model.get('base');
		this.spread = model.get('spread');
	},

	tick: function(){
		var diff = _.random((this.model.maxPips / 2).toFixed(), this.model.maxPips);
		this.base = big(this.base)[map[Number.random(0,1)]](diff).toFixed();
	}
});
