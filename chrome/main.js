var addons = {};

function chrome_load_addons(){
    addons = get_addons();
}

function chrome_exec_addons(){
	Object.keys(addons).forEach(function(key){
		var addon = addons[key];
		if(addon.regexPath.test(window.location.href)){
			addon.scriptFiles.forEach(function(script_path) {
				inject_script(script_path);
			});
		}
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
