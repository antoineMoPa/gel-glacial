/* 
   Selon des regex qui examinent la page principale en cours,
   on va exécuter différentes fonctions:
*/
var listeners = [
    {
        path_regex: /notesEtu\.php$/,
        callback: function(body,root){
            // On défini ça ailleurs pour alléger
            addons_notes_etu(body,root);
        }
    }
];

listen_principal_change();

function listen_principal_change(){
    var principal = document.querySelectorAll("frame[name=principal]")[0];

    /* Chaque fois que ça load */
    principal.onload = function(){
        var path = principal.contentWindow.location.pathname;
        /* On regarde si on a des fonctions à exécuter */
        match_path(path);
    }
    
    function match_path(path){
        console.log(path);
        /* Est-ce qu'on trouve des petites fonctions à exécuter? */
        for(var l in listeners){
            var listener = listeners[l];
            if(listener.path_regex.test(path)){
                /* ET OUI! ON EN A UNE, YASS, PRAISE THE LORD */
                /* Fallait le savoir: */
                var principal_body = principal.contentDocument.body;
                var root = principal.contentWindow;
                listener.callback(principal_body,root);
            }
        }
    }
}

function addons_notes_etu(body,root){
    /*
      On crée la bar de gel-glacial
    */
    var bar = document.createElement("div");
    bar.classList.add("gel-glacial-bar");
    
    var button = document.createElement("button");
    button.innerText = "Convertir en %"
    button.classList.add("gel-glacial");
    // On attache l'évènement:
    button.onclick = function(){
        convertir_notes_etu_en_pourcentage(body, root);
    }
    bar.appendChild(button);
    body.insertBefore(bar,body.children[0]);
}

function convertir_notes_etu_en_pourcentage(body, root){    
    var items = root.dataGrille.items;
    var ponderation_items = root.dataToolTip;

    var table_rows = body.querySelectorAll(".dojoxGridMasterView .dojoxGridRow");

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
