/* Version 0.2 */

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
	btn_ponderation.innerHTML = "Afficher toutes les pond&eacute;rations";
	btn_ponderation.classList.add("gel-glacial");
	btn_ponderation.onclick = get_all_ponderation;

	// Btn div
	var div_btn = document.createElement("div");
	div_btn.id = "btn_ponderation";
	div_btn.classList.add("gel-glacial-bar");
	div_btn.appendChild(btn_ponderation);
	
	// Insert btns group
	document.body.insertBefore(div_btn,document.body.children[0]);
}

// Get Ponderation datas from url ponderation
function get_all_ponderation(){

	// Change Note's div id
	document.getElementById("gridContainer4").id = "gridNotes";
	document.getElementById("Loader").id = "LoaderNotes";
    
	// Disable btn for loading
	btn_ponderation.disabled = true;
	btn_ponderation.innerHTML = "T&eacute;l&eacute;chargement...";
	
	// Set url to get data ponderation
	var url = window.location.href;
	url = url.replace("notesEtu.php", "ponderation.php");
	
	var dataToolTip = unsafeWindow.dataToolTip;
	// Get all data needed from ponderation page
	jQuery.get(url, function(data){
		var weights_div = jQuery("#ponderation_grid");
		var weights_page = jQuery("<div/>").html(data);
		weights_div.append(weights_page.find("#gridContainer4"));
		weights_div.append(weights_page.find("#Loader"));
		//the script has to be accessed using an hard coded offset
		//since it has no attributes :(
		var script = weights_page.find("script")[3].innerHTML;
	
		//each dojo widget needs a different id
		script = script.replace("id: 'grid',", "id: 'grid2',");
		unsafeWindow.eval(script);

		data_ponderation = unsafeWindow.data;
		for (i = 0; i < data_ponderation.length-1; i++){
			for (j = 0; j < countProperties(data_ponderation[i])-1; j++){
				if(data_ponderation[i][j] != ""
				   && typeof dataToolTip[i][j] != 'undefined'
				   && typeof dataToolTip[i][j].ponderation != 'undefined'){
					dataToolTip[i][j].ponderation = data_ponderation[i][j];
				}
			}
		}
		unsafeWindow.dataToolTip = dataToolTip;

		//btn_ponderation.onclick = show_hide_ponderation;
		//btn_ponderation.disabled = false;

		// Hide button after loading data
		
		document.getElementById('ponderation_grid')
			.style.display = 'none';
		
		btn_ponderation.style.display = 'none';
		
		// Hide grid
		//show_hide_ponderation();
	});
}

// Create Ponderation Grid
function create_div_pond_grid(){
	pond_grid = document.createElement('div');
	pond_grid.id = "ponderation_grid";
	
	// Append grid
	document.getElementsByTagName('body')[0].appendChild(pond_grid);
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
