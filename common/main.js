
/* 
   Selon des regex qui examinent la page principale en cours,
   on va exécuter différentes fonctions:
*/
var listeners = [
    {
        path_regex: /notesEtu\.php$/,
        callback: function(){
            // On défini ça ailleurs pour alléger
            addons_notes_etu();
        }
    }
];

listen_page();

function listen_page(){
    var path = window.location.pathname;
    match_path(path);
    function match_path(path){
        for(var l in listeners){
            var listener = listeners[l];
            if(listener.path_regex.test(path)){
                listener.callback();
            }
        }
    }
}

function addons_notes_etu(){
    /*
      On crée la bar de gel-glacial
    */
    var bar = document.createElement("div");
    bar.classList.add("gel-glacial-bar");
    
    var button = document.createElement("button");
    button.innerHTML = "Convertir en %"
    button.classList.add("gel-glacial");
    // On attache l'évènement:
    button.onclick = convertir_notes_etu_en_pourcentage;
    bar.appendChild(button);
    document.body.insertBefore(bar,document.body.children[0]);

}

function convertir_notes_etu_en_pourcentage(){
    /* 
       On va chercher les données 
       Puisqu'on peut pas avoir directement accès aux variables 
       du code dans une extension, on va aller chercher dataGrille
       et l'ajouter comme attribut du "body",
       même chose pour dataToolTip qui contient les pondération.
    */
    var script = document.createElement("script");
    script.innerHTML = "";
    script.innerHTML +=
    "document.body.setAttribute('data-datagrille',JSON.stringify(dataGrille));";
    script.innerHTML +=
    "document.body.setAttribute('data-datatooltip',JSON.stringify(dataToolTip));";
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
