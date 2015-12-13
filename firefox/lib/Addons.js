//Addons class
//Use to load every pagmode script to modifiy the content of the window
//Normaly each addon is a specifict route change

function Addons(Globals){
	
	this.Globals = Globals;
	
	this.addons = {};
	
	this.load();
	this.start();
}

Addons.prototype.load = function(){
	this.addons = this.Globals.Metadata.Addons;
}

Addons.prototype.start = function(){
	var pageMod = require("sdk/page-mod");
	
	//Construct all addons mod
	Object.keys(this.addons).forEach(function(key){
		var addon = this.addons[key];
		pageMod.PageMod({
			"include" : "*.usherbrooke.ca",
			"contentScriptFile" : addon.contentScriptFile,
			"contentStyleFile" : addon.contentStyleFile,
		})
	}.bind(this))
}

exports.Addons = Addons;