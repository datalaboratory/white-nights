define(['./StartPage', 'provoda', './RunnerMapComplex', 'spv'], function(StartPage, provoda, RunnerMapComplex) {
"use strict";

var AppModel = function(){};
provoda.Model.extendTo(AppModel, {
	init: function() {
		this._super();
        this.navigation = [];
		this.start_page = (new StartPage()).init({
			app: this
		});
		this.updateNesting('navigation', [this.start_page]);
		this.updateNesting('start_page', this.start_page);

		var runs_map_compx = new RunnerMapComplex();
		runs_map_compx.init({
			map_parent: this,
			app: this
		});
		this.runs_map_compx = runs_map_compx;
		this.updateNesting('runs_map_compx', runs_map_compx);
	}
});
return AppModel;
});