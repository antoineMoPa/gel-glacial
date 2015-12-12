/* global ] */
/* global [ */
/* global [ */
function addon_marks(){
	//Create the addon div
	var div = document.createElement("div");
	div.classList.add("gel-glacial-bar");
	
	//Create the button for percent convertion
	var button = document.createElement("button");
	button.innerHTML = "Convertir en %"
	button.classList.add("gel-glacial");
	
	//Set the callback of the button
	button.onclick = convert_marks_in_percent;
	
	//update the doccument
	div.appendChild(button);
	document.body.insertBefore(div,document.body.children[0]);
}

//TODO translation
function convert_marks_in_percent(){	
	//There is 1 variable needed in the notesEtu.php file
	//dataToolTip : contain the marks info
	//we can't acces it here so we need to set it as a body attribute and capture it later
	var script = document.createElement("script");
	script.innerHTML = "";
	script.innerHTML += "document.body.setAttribute('data-dataToolTip',JSON.stringify(dataToolTip));";
	document.body.appendChild(script);
	
	//Now we can acces it
	var dataToolTip = JSON.parse(document.body.getAttribute("data-dataToolTip"));
	var data = JSON.parse(dataToolTip);
	
	//Change marks in the grid
	var table_rows = document.querySelectorAll(".dojoxGridMasterView .dojoxGridRow");
	for(var i = 0; i < data.length; i++){
		var row = table_rows[i].querySelectorAll("td.dojoxGridCell");
		
		//Single marks
		for(var j = 3; j < row.length; j++){
			// Grid elements are offset by 3 from the real td elements
			var _j = j-3;
			
			test_and_set_cell_value(data[i], _j, row, j);
		}

		//TÉ column
		test_and_set_cell_value(data[i], "tee", row, 2);
	}
}

function test_and_set_cell_value(data_row, data_id, table_row, table_cell_id){	
	if(typeof(data_row[data_id]) == "object"){
		var mark_obj = data_row[data_id];
		
		var pond = (!isNaN(mark_obj.ponderation)) ? Number(mark_obj.ponderation) : null;
		var mark = (!isNaN(mark_obj.note)) ? Number(mark_obj.note) : null;
		
		if(mark != null && pond != null){
			var percent = (mark / pond * 100).toFixed(1);
			table_row[table_cell_id].innerHTML = "<span style='font-size:8px;'>"+ percent +"%</span>";
		}
	}
};

self.port.on("exec", function(){
	// filter the page
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;
	
	//exec listeners base on there regex
	if(regex.test(path)){
		addon_marks();
	}
})