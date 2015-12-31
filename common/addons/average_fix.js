var marks_grid;

function addon_average_fix(){
	if(typeof marks_grid === 'undefined'){
		//gather marks data
		marks_grid = get_marks_grid();
	}

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

function get_marks_grid(){
	//There are variables needed in the notesEtu.php file
	//we can't acces it here so we need to set it as a body attribute and capture it later
	var script = document.createElement("script");
	script.innerHTML = "";
	script.innerHTML += "document.body.setAttribute('data-info',JSON.stringify(data));";
	script.innerHTML += "document.body.setAttribute('data-dataToolTip',JSON.stringify(dataToolTip));";
	document.body.appendChild(script);
	
	//Now we can acces them
	var info = JSON.parse(JSON.parse(document.body.getAttribute("data-info")));
	var dataToolTip = JSON.parse(document.body.getAttribute("data-dataToolTip"));
	
	var raw_data = JSON.parse(dataToolTip);
	var data = {
		"layout" : {
			"prefixes" : [],
			"groups" : {}
		},
		"rows" : [],
	};
	
	//rows
	raw_data.forEach(function(row, index){
		var info_row = info[index];
		
		// if(index == raw_data.length){
			//TODO last row is kinda weird (1.5 row)
		// } else {
			var new_row = {
				"title" : info_row.controle[0],
				"cells" : [],
				"total" : null,
				"evaluation_type" : info_row.ie[0],
			};
			
			//construct each cells (obj if there is a mark, null else)
			Object.keys(row).forEach(function(key){	
				if(!isNaN(key)){
					new_row.cells.push(build_mark_obj(row[key]));
				} else if(key == "tee" && row[key].moyenne != "0.0"){
					new_row.total = build_mark_obj(row[key])
				}
			})

			data.rows.push(new_row);
		// }
	});
	
	//layout
	//We cant access to the header layout directly
	//So find all divs of the header and rebuild information
	var $cells = jQuery('div[dojoattachpoint="headerContentNode"]').find(jQuery('div'));
	
	//filter data [prefixes - sizes - titles]
	var grp_size = 0;
	var titles = [];
	var titles_size = [];
	$cells.each(function(index){
		var text = jQuery(this).html();
		
		if(index < 3){
			//3 first cells are for prefix
			data.layout.prefixes.push(text);
		} else if(!isNaN(text)){
			//gather the size of each mark's group
			var id = Number(text);
			if(id == 1 && grp_size != 0){
				//append to tittles_size
				titles_size.push(grp_size);
			}
			
			grp_size = id;
		} else {
			//gather each title
			
			if(grp_size != 0){
				//the last groups size is not append, now it is
				titles_size.push(grp_size);
				grp_size = 0;
			}
			
			titles.push(text);
		}
	})
	
	//rebuild for data.layout
	titles.forEach(function(title, index){
		data.layout.groups[title] = titles_size[index];
	})

	return data;
}

function build_mark_obj(obj){
	//if there cell is fill (no "")
	if(typeof(obj) == "object"){
		//convert everything in number if possible
		var mark = (!isNaN(obj.note)) ? Number(obj.note) : null;
		var weight = (!isNaN(obj.ponderation)) ? Number(obj.ponderation) : null;
		var average = (!isNaN(obj.moyenne)) ? Number(obj.moyenne) : null;
		var sd = (!isNaN(obj.ecartType)) ? Number(obj.ecartType) : null;
		
		var mark_obj = {};
		
		if(mark == null && weight == null && average == null && sd == null){
			return null;
		}
		if(mark != null){
			mark_obj.mark = mark;
		}
		if(weight != null){
			mark_obj.weight = weight;
		}
		if(average != null){
			mark_obj.average = average;
		}
		if(sd != null){
			mark_obj.sd = sd;
		}
		
		return mark_obj;
	}
	
	//if something is wrong
	return null;
}

function defer_and_notify(event) {
    if(window.jQuery)
        document.dispatchEvent(event);
    else
        setTimeout(function() { defer_and_notify(event) }, 50);
}


document.addEventListener('jQueryLoaded', function(e){
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;

	//exec listeners base on there regex
	if(regex.test(path)){
		addon_average_fix();
	}
});

defer_and_notify(new Event('jQueryLoaded'));
