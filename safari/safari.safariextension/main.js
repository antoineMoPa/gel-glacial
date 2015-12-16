var addons = [];

function safari_load_addons(){
	//TODO need to find all addons in the addons folder and load them
	//these fields should be in the addon file and more modular (lib)
	addons.push({
		"regex_path"  : /.*\.usherbrooke\.ca\/.*\/notesEtu\.php/,
		"addon_path"  : "addons/marks.js",
        "lib_path"    : "lib/external/jquery-2.1.4.min.js",
		"style_path"  : "style.css",
	});
}

function safari_exec_addons(){
	//Set listener to a url and execute the addon when matched
	
	
	//Construct all addons mod
	console.log("forEach : addon ");

	addons.forEach(function(addon){
		if(addon.regex_path.test(window.location.href)){
            inject_script(addon.lib_path);
			inject_script(addon.addon_path);
		}
	})
}

function inject_script(url){
	var url = safari.extension.baseURI + url;
	var script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
}

function safari_init_scripts(){	
	safari_load_addons();
	safari_exec_addons();
}

//Wait until "#Loader" appear (this seem to be one of last thing that generated in this page)
function waitForElement(elementPath, callBack){
    window.setTimeout(function(){
                      if(!document.getElementById("Loader").length){
                        safari_init_scripts();
                      }else{
                        waitForElement(elementPath, callBack);
                      }
                      },500)
}

waitForElement("#Loader",function(){
               console.log("done");
               });








