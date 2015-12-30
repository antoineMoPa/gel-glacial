function addon_new_marks(){
	if(typeof marks_grid === 'undefined'){
		//gather marks data
		marks_grid = get_marks_grid();
	}

	//passing data to content_script
	window.postMessage({marks: marks_grid}, '*');
}

window.addEventListener('message', function(event) {
	if('grid_changed' in event.data){
		var grid_changed = event.data.grid_changed;

		var table_rows = document.querySelectorAll(".dojoxGridMasterView .dojoxGridRow");
		var row = table_rows[grid_changed.row_index].querySelectorAll("td.dojoxGridCell");
		row[grid_changed.cell_index + 3].style.backgroundColor = "yellow";
	}
});

function exec(){
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;
	
	//exec listeners base on there regex
	if(regex.test(path)){
		addon_new_marks();
	}
}
exec();