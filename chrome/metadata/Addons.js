//get_addons has a global scope
var get_addons = (function() {
	var addons = {
		"marks" : {
			"regexPath" : /.*\.usherbrooke\.ca\/.*\/notesEtu\.php/,
			"scriptFiles" : ["marks_addon.js"],
			"styleFiles" : ["style.css"]
		}
	}

	//paths is relative to data/ folder
	var paths = {
		"jquery.js" : "./lib/external/jquery-2.1.4.min.js",
		"marks.js" : "./addons/marks.js",
		"marks_weighting.js" : "./addons/marks_weighting.js",
		"dependence_postponing.js" : "./lib/dependence_postponing.js",
		"marks_gathering.js" : "./addons/marks_gathering.js",
		"average_fix.js" : "./addons/average_fix.js",
		"new_marks.js" : "./addons/new_marks.js",
		"marks_addon.js" : "./addons/marks_addon.js",
		"style.css" : "./style.css",
	}

	return function(){
		var new_addons = {};
		
		Object.keys(addons).forEach(function(key){
			var addon = addons[key];
			new_addons[key] = {};
			new_addons[key].regexPath = addon.regexPath;
			new_addons[key].scriptFiles = addon.scriptFiles.map(function(script){
				return paths[script];
			});
			new_addons[key].styleFiles = addon.styleFiles.map(function(style){
				return paths[style];
			});
		});
		return new_addons;
	}
})();
