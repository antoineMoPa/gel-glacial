var button;

function addon_marks(){
	//Create the addon div
	var div = document.createElement("div");
	div.classList.add("gel-glacial-bar");
	
	//Create the button for percent convertion
	button = document.createElement("button");
	button.innerHTML = "Convertir en %"
	button.classList.add("gel-glacial");
	
	//Set the callback of the button
	button.onclick = show_percent_mark;
	
	//update the doccument
	div.appendChild(button);
	document.body.insertBefore(div,document.body.children[0]);
}

//TODO translation
function show_percent_mark(){
	if(typeof marks_grid === 'undefined'){
		//gather marks data
		marks_grid = get_marks_grid();
	}

	//Change marks in the grid
	var table_rows = document.querySelectorAll(".dojoxGridMasterView .dojoxGridRow");
	for(var i = 0; i < marks_grid.rows.length; i++){
		var row = table_rows[i].querySelectorAll("td.dojoxGridCell");
		
		//Single marks
		for(var j = 0; j < marks_grid.rows[i].cells.length; j++){
			set_percent_mark_cell_value(marks_grid.rows[i].cells[j], row, j+3);
		}
		//TÉ column
		set_percent_mark_cell_value(marks_grid.rows[i].total, row, 2);
	}
	
	//TODO change mark at last row to substract missing marks' weight
	
	button_toggle();
}

function show_original_mark(){
	//Change marks in the grid
	var table_rows = document.querySelectorAll(".dojoxGridMasterView .dojoxGridRow");
	for(var i = 0; i < marks_grid.rows.length; i++){
		var row = table_rows[i].querySelectorAll("td.dojoxGridCell");
		
		//Single marks
		for(var j = 0; j < marks_grid.rows[i].cells.length; j++){
			set_mark_cell_value(marks_grid.rows[i].cells[j], row, j+3);
		}
		//TÉ column
		set_mark_cell_value(marks_grid.rows[i].total, row, 2);
	}
	
	//TODO change mark at last row to substract missing marks' weight
	
	button_toggle();
}

function set_percent_mark_cell_value(mark, table_row, table_cell_id){	
	if(mark != null && mark.mark != null && mark.weight != null){
	        var value = (mark.mark / mark.weight * 100).toFixed(1);
		set_cell_value(value, table_row, table_cell_id);
	}
}

function set_mark_cell_value(mark, table_row, table_cell_id){
	if(mark != null && mark.mark != null && mark.weight != null){
		var value = (mark.mark).toFixed(1);
		set_cell_value(value, table_row, table_cell_id);
	}
}

function set_cell_value(value, table_row, table_cell_id){
	table_row[table_cell_id].innerHTML = value;
}

function button_toggle(){
	if(button.innerHTML == "Convertir en %"){
		button.innerHTML = "Notes d'origine"
		button.classList.add("gel-glacial");
	
		//Set the callback of the button
		button.onclick = show_original_mark;
	} else{
		button.innerHTML = "Convertir en %"
		button.classList.add("gel-glacial");
	
		//Set the callback of the button
		button.onclick = show_percent_mark;
	}
}

function exec(){
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;
	
	//exec listeners base on there regex
	if(regex.test(path)){
		addon_marks();
	}
}
exec();