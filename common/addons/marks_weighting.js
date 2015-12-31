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
    btn_ponderation.innerHTML = "Affiche toutes les ponderations";
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
    btn_ponderation.innerHTML = "Telechargement...";
    
    // Set url to get data ponderation
    var url = window.location.href;
    url = url.replace("notesEtu.php", "ponderation.php");
    
    // Get all data needed from ponderation page
    jQuery("#ponderation_grid").load(url ,function(){
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
		};
        // Add listener when loading is complet
        observe_loading();
    });
}

// Observer Loading Page 0_0
function observe_loading(){

    // Observe when page will be all loaded (necessary)
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
        
            // At this point some cell's data remaining
            observe_cells();
            //console.log('Page ponderation finish loading');
        });
    });
    
    // Apply observer on target
    document.getElementById('Loader').setAttribute('style','visibility: visible;');
    var target = document.getElementById('Loader');
    observer.observe(target, { attributes : true, attributeFilter : ['style'] });
}

// Observe Grid Finish Loading 0_0
function observe_cells(){

    // Observe when page will be all loaded (necessary)
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            // Keep only grid
            keep_grid_only();
            // Reset btn
            btn_ponderation.onclick = show_hide_ponderation;
            btn_ponderation.disabled = false;
            // Hide grid
            show_hide_ponderation();
            //console.log('Grid ponderation finish loading');
        });
    });
    
    // Apply target
    jQuery('#gridContainer4').find('.dojoxGridMasterView').attr('style','height: 0px;');
    jQuery('#gridContainer4').find('.dojoxGridMasterView').attr('id','gridPonderation');
    var target = document.getElementById('gridPonderation');
    observer.observe(target, { attributes : true, attributeFilter : ['style'] });
}

// Keep grid only from loaded page
function keep_grid_only(){
    var grid_only = jQuery('#gridContainer4');
    jQuery('#ponderation_grid').html(grid_only.html());
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
document.addEventListener('jQueryLoaded', function(e){
	var path = window.location.pathname;
	var regex = /notesEtu\.php$/;

	//exec listeners base on there regex
	if(regex.test(path)){
		addon_ponderation();
	}
});
