function addon_new_marks(){
	if(typeof marks_grid === 'undefined'){
		//gather marks data
		marks_grid = get_marks_grid();
	}

	check_for_new_marks();
}

function check_for_new_marks(){
	if('marks' in localStorage){
		var old_marks = JSON.parse(localStorage.marks);
		old_marks.rows = JSON.parse(old_marks.rows);
		marks_grid.rows.forEach(function(row, row_index){
			row.cells.forEach(function(cell, cell_index){
				var old_cell = old_marks.rows[row_index].cells[cell_index];
				if(old_cell !== cell && old_cell.mark != cell.mark){
					highlight_mark(row_index, cell_index);
				}
			});
		});
	}
	localStorage.marks = JSON.stringify(marks_grid);
}

function highlight_mark(row_index, cell_index){
	var table_rows = document.querySelectorAll(".dojoxGridMasterView .dojoxGridRow");
	var row = table_rows[row_index].querySelectorAll("td.dojoxGridCell");
	row[cell_index + 3].style.backgroundColor = "yellow";
}

document.addEventListener('jQueryLoaded', function(e){
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;

	//exec listeners base on there regex
	if(regex.test(path)){
		addon_new_marks();
	}
});
