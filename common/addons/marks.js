function addon_marks(){
	//Create the addon div
	var div = document.createElement("div");
	div.classList.add("gel-glacial-bar");
	
	//Create the button for percent convertion
	var button = document.createElement("button");
	button.innerHTML = "Convertir en %"
	button.classList.add("gel-glacial");
	
	//Set the callback of the button
	button.onclick = convert_mark_to_percent;
	
	//update the doccument
	div.appendChild(button);
	document.body.insertBefore(div,document.body.children[0]);
}

//TODO translation
function convert_mark_to_percent(){
    /* 
       On va chercher les données 
       Puisqu'on peut pas avoir directement accès aux variables 
       du code dans une extension, on va aller chercher dataGrille
       et l'ajouter comme attribut du "body",
       même chose pour dataToolTip qui contient les pondération.
    */
    var script = document.createElement("script");
    script.innerHTML = "";
    script.innerHTML += "document.body.setAttribute('data-datagrille',JSON.stringify(dataGrille));";
    script.innerHTML += "document.body.setAttribute('data-datatooltip',JSON.stringify(dataToolTip));";
    document.body.appendChild(script);
    
    /*
      Maintenant, si tout va bien, on peut aller chercher nos variables tant désirées
      Amen
    */
    var dataGrille = JSON.parse(document.body.getAttribute("data-datagrille"));
    var dataToolTip = JSON.parse(document.body.getAttribute("data-datatooltip"));

    /*
      JSON.stringify a aussi encodé les sous-variables...
     */
    var items = JSON.parse(dataGrille.items);
    var ponderation_items = JSON.parse(dataToolTip);
    var table_rows = document
        .querySelectorAll(".dojoxGridMasterView .dojoxGridRow");

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
    //PATCH, need to filter the adress in index.js
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;
	
	//exec listeners base on there regex
	if(regex.test(path)){
		addon_marks();
	}
})