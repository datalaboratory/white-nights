define(['jquery', 'spv', './StartPageCtr', './RunMapCompxCtr'],
function($, spv, StartPageCtr, RunMapCompxCtr) {
"use strict";


var notExist = function(el) {return typeof el == 'undefined';};
var noArgs = function() {
	return Array.prototype.some.call(arguments, notExist);
};

var AppView = function(){};
provoda.View.extendTo(AppView, {
	children_views: {
		start_page : StartPageCtr,
		runs_map_compx: RunMapCompxCtr
	},
	'collch-start_page': true,
	'collch-runs_map_compx': true,
    dom_rp: true,
    manual_states_connect: true,
	createDetails: function() {
        this.root_view = this;
        this.d = this.opts.d;
        this.tpls = [];
        this.els = {};
		this._super();
		var _this = this;
		setTimeout(function() {
			spv.domReady(_this.d, function() {
				_this.buildAppDOM();
			});
		});
	},
	buildAppDOM: function() {
		var d = this.d;
		/*this.els.scrolling_viewport = {
			node: $(d.body),
			offset: true
		};*/
		this.els.screens = $('#screens', d);
		this.els.start_screen = $('#start-screen',d);
		this.els.bwrap = $(d.body).children('.big-wrap');
		this.els.runm_c = $('#runs_map_compx');
		this.onDomBuild();
		
	},
    onDomBuild: function() {
        this.c = $(this.d.body);
        this.c.addClass('app-loaded');
        this.completeDomBuilding();
    },
    completeDomBuilding: function() {
        this.connectStates();
        this.connectChildrenModels();
        this.requestAll();
    },
	'stch-maxwidth': function(state) {
		this.els.bwrap.css('max-width', Math.round(state) + 'px');
	},
	noArgs: noArgs
	
});
return AppView;
});