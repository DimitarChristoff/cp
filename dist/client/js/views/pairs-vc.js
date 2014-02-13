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

		add: function(title){
			var m = this.pairs.findOne('[title=' + title + ']');

			if (!m){
				m = new CP({
					title: title,
					size: 100
				});

				this.pairs.add(m);
				transport.subscribe('cp:change:'+title, function(data){
					m.set(data);
				});

				transport.send('cp:start', title);
			}

			new CPview({
				element: 'div.pairs',
				model: m
			});
		},

		addCurrencyPair: function(e, self){
			e.preventDefault && e.preventDefault();
			var selected = this.getAttribute('href').replace('#', '');

			if (!selected)
				return;

			self.add(selected);
		},

		addManyPairs: function(e, self){
			e.preventDefault && e.preventDefault();
			var links = self.$element.find('a.cp').map(function(i, el){
				return el.getAttribute('href').replace('#', '');
			});

			var count = Number(this.getAttribute('href').replace('#', ''));

			while(count--){
				self.add(links[_.random(0, links.length-1)]);
			}

		}

	});

});