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

window.addEventListener('message', function(event){
	if('marks' in event.data){
		chrome.storage.local.set({'marks': event.data.marks}, function(){
			if(typeof chrome.runtime.lastError !== 'undefined')
				console.log("Unable to store marks");
		});
	}
});

chrome.storage.onChanged.addListener(function(changes) {
	if('marks' in changes && 'oldValue' in changes.marks){
		changes.marks.newValue.rows.forEach(function(row, row_index){
			row.cells.forEach(function(cell, cell_index){
				var old_cell = changes.marks.oldValue.rows[row_index].cells[cell_index];
				if(old_cell !== cell && old_cell.mark != cell.mark){
					window.postMessage({grid_changed:
								{row_index: row_index,
								 cell_index: cell_index}
							   }, '*');
				}
			});
		});
	}
});

//exec the code
chrome_init_scripts();
