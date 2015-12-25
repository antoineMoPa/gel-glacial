var addons = [];

function chrome_load_addons(){
	//TODO need to find all addons in the addons folder and load them
	//these fields should be in the addon file and more modular (lib)
	addons.push({
		"regex_path" : /.*\.usherbrooke\.ca\/.*\/notesEtu\.php/,
		"addon_path" : ["./lib/external/jquery-2.1.4.min.js", "./addons/marks.js"],
		"style_path" : "./style.css",
	});
}

function chrome_exec_addons(){
	//Set listener to a url and execute the addon when matched
	
	
	//Construct all addons mod
	addons.forEach(function(addon){
		if(addon.regex_path.test(window.location.href)){
			addon.addon_path.forEach(function(addon_path) {
				inject_script(addon_path);
			});
		}
		/*
		pageMod.PageMod({
			"include" : addon.regex_path,
			"contentScriptFile" : [
				"./lib/external/jquery-2.1.4.min.js",
				addon.addon_path
			],
			"contentStyleFile" : addon.style_path,
			"onAttach" : function(worker){
				worker.port.emit("exec");
			}
		})*/
	})
}

function inject_script(url){
	var url = chrome.extension.getURL(url);
	var script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
}

function chrome_init_scripts(){	
	chrome_load_addons();
	chrome_exec_addons();
}

//exec the code
chrome_init_scripts();
