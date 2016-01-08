var registered_ids = {};

function postpone(id, check, callback){
	if(!(id in registered_ids)){
		registered_ids[id] = {};
		registered_ids[id].check = check;
		registered_ids[id].callbacks = Array();
	}
	registered_ids[id].callbacks.push(callback);
}

setInterval(function(){
	Object.keys(registered_ids).forEach(function(id){
		var entry = registered_ids[id];
		if(entry.check()){
			entry.callbacks.forEach(function(callback){
				callback();
			});
			delete registered_ids[id];
		}
	});
}, 100);
