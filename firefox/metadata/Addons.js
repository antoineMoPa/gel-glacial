var addons = {
	"marks" : {
		"contentScriptFile" : ["jquery.js", "marks_gathering.js", "marks.js", "marks_weighting.js", "new_marks.js", "average_fix.js"],
		"contentStyleFile" : ["style.css"],
	},
	"zip_documents" : {
		"contentScriptFile" : ["jszip.js", "utils.js", "fetch.js",
					"download.js"],
		"contentStyleFile" : ["style.css"]
	}
}

//paths is relative to data/ folder
var paths = {
	"jquery.js" : "./lib/external/jquery-2.1.4.min.js",
	"marks.js" : "./addons/marks.js",
	"marks_weighting.js" : "./addons/marks_weighting.js",
	"marks_gathering.js" : "./addons/marks_gathering.js",
	"average_fix.js" : "./addons/average_fix.js",
	"jszip.js" : "./lib/external/jszip.min.js",
	"utils.js" : "./addons/utils.js",
	"fetch.js" : "./addons/fetch.js",
	"download.js" : "./addons/download.js",
	"new_marks.js" : "./addons/new_marks.js",
	"style.css" : "./style.css",	
}

function get_addons(){
	var new_addons = {};
	
	Object.keys(addons).forEach(function(key){
		var addon = addons[key];
		new_addons[key] = {};
		new_addons[key].contentScriptFile = addon.contentScriptFile.map(function(script){
			return paths[script];
		})
		new_addons[key].contentStyleFile = addon.contentStyleFile.map(function(style){
			return paths[style];
		})
	})
	
	return new_addons;
}

module.exports = get_addons();