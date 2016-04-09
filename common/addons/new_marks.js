function addon_new_marks(){
	check_for_new_marks();
}

function check_for_new_marks(){
	//TODO watch for a visit to someone else's account
	if(marks_grid.semester in localStorage){
		var old_marks = JSON.parse(localStorage[marks_grid.semester]);
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
	localStorage[marks_grid.semester] = JSON.stringify(marks_grid);
}

function highlight_mark(row_index, cell_index){
	var table_rows = document.querySelectorAll(".dojoxGridMasterView .dojoxGridRow");
	var row = table_rows[row_index].querySelectorAll("td.dojoxGridCell");
	row[cell_index + 3].style.backgroundColor = "yellow";
}

(function(){
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;
	
	//exec listeners base on there regex
	if(regex.test(path)){
		addon_new_marks();
	}
})();
