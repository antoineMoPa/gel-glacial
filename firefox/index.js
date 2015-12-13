
var Application = function(){
	this.config_log();
	
	this.Globals = {
		"Metadata" : {},
		"Libraries"	: {},
	};
	this.load_globals();
	
	this.create_toolbar_ui();
	this.start_addons();
}

Application.prototype.config_log = function(){
	//config console.log
	var sp = require('sdk/simple-prefs');
	sp.prefs['sdk.console.logLevel'] = 'all';
}

Application.prototype.load_globals = function(){
	//init this.Globals
	
	//TODO load all metadata of the folder
	//this.Globals.Metadata[file_name] = require("./metadata/" + file_name);
	this.Globals.Metadata.Addons = require("./metadata/Addons.js");
	
	//TODO load all lib of the folder
	this.Globals.Libraries.Addons = require("./lib/Addons.js").Addons;
}

Application.prototype.create_toolbar_ui = function(){
	var buttons = require('sdk/ui/button/action');
	
	//Create the toolbar button
	var button = buttons.ActionButton({
		"id" : "gel",
		"label" : "Gel USherbrooke",
		"icon" : {
			"16": "./icon-16.png",
			"32": "./icon-32.png",
			"64": "./icon-64.png"
		}
	});
}

Application.prototype.start_addons = function(){		
	//Start every page mod script
	var Addons = new this.Globals.Libraries.Addons(this.Globals);
}

//start the app
var app = new Application();
