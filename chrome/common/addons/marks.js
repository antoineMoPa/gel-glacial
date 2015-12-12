function addon_marks(){
	//Create the addon div
	var div = document.createElement("div");
	div.classList.add("gel-glacial-bar");
	
	//Create the button for percent convertion
	var button = document.createElement("button");
	button.innerHTML = "Convertir en %"
	button.classList.add("gel-glacial");
	
	//Set the callback of the button
	button.onclick = convert_marks_to_percent;
	
	//update the doccument
	div.appendChild(button);
	document.body.insertBefore(div,document.body.children[0]);
}

//TODO translation
function convert_marks_to_percent(){    
    //There is 2 variables in the notesEtu.php file
    //dataGrille : contain student's marks
    //dataToolTip : contain the ponderation
    //we can't acces them here so we need to set them as a body attribute and capture them later
    var script = document.createElement("script");
    script.innerHTML = "";
    script.innerHTML += "document.body.setAttribute('data-dataGrid',JSON.stringify(dataGrille));";
    script.innerHTML += "document.body.setAttribute('data-dataToolTip',JSON.stringify(dataToolTip));";
    document.body.appendChild(script);
    
    //Now we can acces them
    var dataGrid = JSON.parse(document.body.getAttribute("data-dataGrid"));
    var dataToolTip = JSON.parse(document.body.getAttribute("data-dataToolTip"));

    var items = JSON.parse(dataGrid.items);
    var ponderation_items = JSON.parse(dataToolTip);
    
    console.log(items);
    // console.log(items);
    
    var table_rows = document.querySelectorAll(".dojoxGridMasterView .dojoxGridRow");

    for(var i = 0; i < items.length; i++){
        var row = table_rows[i].querySelectorAll("td.dojoxGridCell");
        for(var j = 0; j < row.length; j++){
            
            // Grid elements are offseted by 3 from the real td elements
            if(items[i][j-3] != undefined && typeof items[i][j-3][0] == "number"){
                if(ponderation_items[i][j-3] != undefined){
                    var pond = ponderation_items[i][j-3].ponderation;
                    var number = items[i][j-3][0];
                    var percent = (number / pond * 100).toFixed(1);
                    row[j].innerHTML = "<span style='font-size:8px;'>" + percent + "%</span>";
                }
            }
        }
    }
}

self.port.on("exec", function(){
    console.log("PASS");
    //PATCH, need to filter the adress in index.js
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;
	
	//exec listeners base on there regex
	if(regex.test(path)){
		addon_marks();
	}
})