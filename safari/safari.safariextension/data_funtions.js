var data_ponderation;
var btn_ponderation;
var pond_grid;

// Addon
function addon_ponderation(){

	// Grid ponderation
	create_div_pond_grid();

	// Btn : Get All Ponderation
    btn_ponderation= document.createElement("button");
    btn_ponderation.id = "btn_ponderation";
    btn_ponderation.innerHTML = "Affiche toutes les ponderations";
    btn_ponderation.classList.add("gel-glacial");
    btn_ponderation.onclick = get_all_ponderation;

	// Btns div
    var div_btn = document.createElement("div");
	div_btn.id = "btn_ponderation";
    div_btn.classList.add("gel-glacial-bar");
	div_btn.appendChild(btn_ponderation);
	
	// Insert btns group
    document.body.insertBefore(div_btn,document.body.children[0]);
}

// Get Ponderation datas from url ponderation
function get_all_ponderation(){

    document.getElementById("gridContainer4").id = "gridNotes";

    btn_ponderation.disabled = true;
    btn_ponderation.innerHTML = "Load datas...";
    var url = window.location.href;
    url = url.replace("notesEtu.php", "ponderation.php");
    $("#ponderation_grid").load(url,function(){
        data_ponderation = data;
		for (i = 0; i < data.length-1; i++) {
			for (j = 0; j < countProperties(data[i])-1; j++) {
				if(data[i][j] != ""){
					if(typeof dataToolTip[i][j] != 'undefined'){
						if(typeof dataToolTip[i][j].ponderation != 'undefined'){
							dataToolTip[i][j].ponderation = data[i][j];
						}
					}
				}
			}
		}
        btn_ponderation.onclick = show_hide_ponderation;
        btn_ponderation.disabled = false;
        btn_ponderation.innerHTML = "Cacher grille des ponderations";
        document.getElementById('ponderation_grid').setAttribute('style','display: block');
	});
}

// Create Ponderation Grid
function create_div_pond_grid(){
	pond_grid = document.createElement('div');
	pond_grid.id = "ponderation_grid";
	
	// Append grid
	document.getElementsByTagName('body')[0].appendChild(pond_grid);
    
	// Debug in console
	console.log("Ponderation Grid created");
}

// Show hide grid div && create it if not exist
function show_hide_ponderation(){
    var id = "ponderation_grid";
    
    // Show
    if(document.getElementById(id).style.display=="block"){
        btn_ponderation.innerHTML = "Afficher Grille des ponderations";
        document.getElementById('ponderation_grid').setAttribute('style','display: none');

    
    //Hide
    }else{
        btn_ponderation.innerHTML = "Cacher grille des ponderations";
        document.getElementById('ponderation_grid').setAttribute('style','display: block');
    }
    return true;
}

// Count number of elements in object
function countProperties(obj) {
    var count = 0;
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }
    return count;
}

// Exec
function exec(){
    var path = window.location.pathname;
    var regex = /notesEtu\.php$/;
    
    //exec listeners base on there regex
    if(regex.test(path)){
        addon_ponderation();
    }
}
exec();
