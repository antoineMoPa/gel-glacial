var addons = [];

function firefox_load_addons(){
	//TODO need to find all addons in the addons folder and load them
	addons.push({
		"regex_path" : "*.usherbrooke.ca",//these fields should be in the addon file and more modular (lib)
		"addon_path" : "./addons/marks.js",
		"style_path" : "./style.css",
	});
}

function firefox_exec_addons(){
	//Set listener to a url and execute the addon when matched
	var pageMod = require("sdk/page-mod");
	
	//Construct all addons mod
	addons.forEach(function(addon){
		pageMod.PageMod({
			"include" : addon.regex_path,
			"contentScriptFile" : ["./lib/external/jquery-2.1.4.min.js",addon.addon_path],
			"contentStyleFile" : addon.style_path,
			"onAttach" : function(worker){
				worker.port.emit("exec");
			}
		})
	})
}

function firefox_init_scripts(){	
	var sp = require('sdk/simple-prefs');
	sp.prefs['sdk.console.logLevel'] = 'all'; //now we can use console.log in pagemod scripts
	
	firefox_load_addons();
	firefox_exec_addons();
}

function firefox_init_button(){
	var buttons = require('sdk/ui/button/action');
	// var tabs = require("sdk/tabs");
	
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

//exec the code
firefox_init_button();
firefox_init_scripts();
