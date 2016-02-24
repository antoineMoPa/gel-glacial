var addons = [];

function safari_load_addons(){
	//TODO need to find all addons in the addons folder and load them
	//these fields should be in the addon file and more modular (lib)
	addons.push({
		"regex_path"  : /.*\.usherbrooke\.ca\/.*\/notesEtu\.php/,
		"addon_path"  : ["addons/marks_addon.js"],
		"style_path"  : "style.css",
	});
	addons.push({
		"regex_path"  : /.*\.usherbrooke\.ca\/.*\/doc.*/,
		"addon_path"  : ["lib/external/jszip.min.js", "addons/utils.js", "addons/fetch.js",
				"addons/download.js"],
		"style_path"  : "style.css",
	});
}

function safari_exec_addons(){
	addons.forEach(function(addon){
		if(addon.regex_path.test(window.location.href)){
			addon.addon_path.forEach(function(script_path) {
				inject_script(script_path);
			});
		}
	})
}

function inject_script(url){
	var url = safari.extension.baseURI + url;
	var script = document.createElement("script");
	script.src = url;
	script.charset = 'UTF-8';
	document.body.appendChild(script);
}

// Exe scrit when page all loaded
jQuery(window).load(function(){
    safari_load_addons();
    safari_exec_addons();
});