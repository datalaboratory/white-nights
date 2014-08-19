define(['provoda'], function(provoda){
"use strict";

var AppBaseView = function() {};
provoda.View.extendTo(AppBaseView, {
	dom_rp: true,
	createDetails: function() {
		this.root_view = this;
		this.d = this.opts.d;
		this.tpls = [];
		this.els = {};
		this.samples = {};
		this.lev_containers = {};
		this.dom_related_props.push('samples', 'lev_containers', 'els');
	},
	completeDomBuilding: function() {
		this.connectStates();
		this.connectChildrenModels();
		this.requestAll();
	},
	manual_states_connect: true
});
return AppBaseView;
});