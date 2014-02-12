define(function(require){
	'use strict';

	var primish = require('epik/index').primish,
		view = require('epik/view'),
		collection = require('epik/collection'),
		rivets = require('epik/plugins/rivets-adapter'),
		tpl = require('text!../../templates/pairs.html'),
		transport = require('../transport'),
		CP = require('../models/cp'),
		CPview = require('./cp-rivets'),
		Pairs = primish({
			extend: collection,
			model: CP
		});

	return primish({

		extend: view,

		implement: rivets,

		constructor: function(options){
			this.selected = '';
			this.pairs = new Pairs();
			this.parent('constructor', options);
		},

		attachEvents: function(){
			this.render();
			this.bindRivets(this);
		},

		render: function(){
			this.$element.html(tpl);
		},

		addCurrencyPair: function(e, self){
			var selected = self.selected;

			if (!selected)
				return;

			var m = self.pairs.findOne('[title=' + selected + ']');

			if (!m){
				m = new CP({
					title: selected,
					size: 100
				});

				self.pairs.add(m);
				transport.subscribe('cp:change:'+selected, function(data){
					m.set(data);
				});

				transport.send('cp:start', selected);
			}

			new CPview({
				element: 'div.pairs',
				model: m
			});

		}

	});

});