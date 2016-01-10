function addon_average_fix(){
	//accruate average marks are the sum of each average mark
	//of the competence
	sum_of_evaluations();
	//the average mark of a course is the sum
 	//of the average mark of each of its competences
	sum_of_competences();
}

function sum_of_evaluations(){
	var index_total_row = marks_grid.rows.length - 1;

	//each competence
	for(var j = 0; j < nbColonneCompetence; j++){
		marks_grid.rows[index_total_row].cells[j].average = 0;
		//each evaluation		
		for(var i = 0; i < marks_grid.rows.length - 1; i++){		
			if(marks_grid.rows[i].cells[j] != null){	    
				marks_grid.rows[index_total_row].cells[j].average += marks_grid.rows[i].cells[j].average;
			}
		}
		dataToolTip[i][j].moyenne = marks_grid.rows[index_total_row].cells[j].average.toFixed(1);
	}
}

function sum_of_competences(){
	var index_extra_total_row = nbControle + 1;
	var index_total_row = marks_grid.rows.length - 1;	

	var index_comp = 0;
	//each course
	for(var j = nbColonneCompetence; j <= index_extra_total_row; j++){
		var number_of_competences = marks_grid.layout.groups[Object.keys(marks_grid.layout.groups)[j - nbColonneCompetence]];
		var index_of_next_course = index_comp + number_of_competences;
		dataToolTip[index_extra_total_row][j].moyenne = 0;

		//each competence
		for(;index_comp < index_of_next_course; index_comp++){
			dataToolTip[index_extra_total_row][j].moyenne += Number(dataToolTip[index_total_row][index_comp].moyenne);
		}
		dataToolTip[index_extra_total_row][j].moyenne = dataToolTip[index_extra_total_row][j].moyenne.toFixed(1);
	}
}

function exec(){
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;
	
	//exec listeners base on there regex
	if(regex.test(path)){
		addon_average_fix();
	}
}
postpone('dataGathered', function(){
	return typeof marks_grid !== 'undefined';
}, exec);
