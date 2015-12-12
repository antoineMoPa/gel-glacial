var data;

function addon_marks(){
	//gather all important data
	data = get_data();
	console.log(data);

	//Create the addon div
	var div = document.createElement("div");
	div.classList.add("gel-glacial-bar");
	
	//Create the button for percent convertion
	var button = document.createElement("button");
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
	//Change marks in the grid
	var table_rows = document.querySelectorAll(".dojoxGridMasterView .dojoxGridRow");
	for(var i = 0; i < data.rows.length; i++){
		var row = table_rows[i].querySelectorAll("td.dojoxGridCell");
		
		//Single marks
		for(var j = 0; j < data.rows[i].cells.length; j++){
			set_percent_mark_cell_value(data.rows[i].cells[j], row, j+3);
		}
		//TÉ column
		set_percent_mark_cell_value(data.rows[i].total, row, 2);
	}
	
	//TODO change mark at last row to substract missing marks' weight
}

function set_percent_mark_cell_value(mark, table_row, table_cell_id){
	if(mark != null && mark.mark != null && mark.weight != null){
		var value = (mark.mark / mark.weight * 100).toFixed(1);
		set_cell_value(value, table_row, table_cell_id);
	} else {
		set_cell_value("", table_row, table_cell_id);
	}
}

function set_cell_value(value, table_row, table_cell_id){
	table_row[table_cell_id].innerHTML = value;
};

function get_data(){
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
				} else if(key == "tee") {
					new_row.total = build_mark_obj(row[key])
				}
			})

			data.rows.push(new_row);
		// }
	});
	
	//layout
	//We cant access to the header layout directly
	//So find all divs of the header and rebuild information
	var $cells = $('div[dojoattachpoint="headerContentNode"]').find($('div'));
	
	//filter data [prefixes - sizes - titles]
	var grp_size = 0;
	var titles = [];
	var titles_size = [];
	$cells.each(function(index){
		var text = $(this).html();
		
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

self.port.on("exec", function(){
	// filter the page
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;
	
	//exec listeners base on there regex
	if(regex.test(path)){
		addon_marks();
	}
})