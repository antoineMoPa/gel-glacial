var marks_grid;

function addon_marks_gathering(){
	//in browsers other than firefox, unsafeWindow becomes a reference of window
	unsafeWindow = window;
	marks_grid = get_marks_grid();
}

function get_marks_grid(){
	var info = unsafeWindow.data;
	
	var raw_data = unsafeWindow.dataToolTip;
	var marks = {
		"semester" : "",
		"layout" : {
			"prefixes" : [],
			"groups" : {}
		},
		"rows" : [],
	};

	//semester
	marks.semester = jQuery("h3")[0].innerHTML;
	
	//rows
	for(var index = 0; index < raw_data.length; index++){
		var row = raw_data[index];
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

			marks.rows.push(new_row);
		// }
	}
	
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
			marks.layout.prefixes.push(text);
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
		marks.layout.groups[title] = titles_size[index];
	})

	return marks;
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

function exec(){
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;
	
	//exec listeners base on there regex
	if(regex.test(path)){
		addon_marks_gathering();
	}
}
postpone('jQueryLoaded', function(){
	return window.jQuery
}, exec);
