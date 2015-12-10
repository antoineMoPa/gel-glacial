
function listen_principal_change(){
    principal = document.querySelectorAll("frame[name=principal]")[0];
    
    principal.onload = function(){
        var path = principal.contentWindow.location.pathname;
        
    }
    
    function match_path(path){
        
    }
}

var listeners = [
    {
        path_match: /notesEtu\.php$/,
        callback: function(body){
            addons_notes_etu(body);
        }
    }
];

function addons_notes_etu(){
    console.log("notes etu");
}

/*
  On crée la bar de gel-glacial
 */
var bar = document.createElement("div");
bar.classList.add("gel-glacial-bar");

/* 
   Les frames, c'est aucunement adapté aux mobiles, 
   ça fait vraiment < 2006 comme code.
   Il faut donc travailler pour aller chercher le body du frame banniere
   pour ajouter le contenu qu'on veut...
*/

var banner = document.body.querySelectorAll("frame[name='banniere']")[0];
var banner_body = banner.contentDocument.body;

/*
  Ça c'est de l'archéologie web
  Documentation archéologique des framesets : http://www.w3.org/TR/WD-html40-970708/present/frames.html
 */
var frameset = document.querySelectorAll("frameset")[0];
var bar_height = 50;
var banniere_height = 75;
var rows_for_banniere = bar_height + banniere_height;
/* 
   normalement, cet attribut est a 75,* 
   75px pour le premier frame (la baniere)
   le reste de l'espace pour les autres frameset le contenu de la page
   On se rajoute de l'espace pour la barre
*/
frameset.setAttribute("rows", rows_for_banniere + ",*");


banner_body.appendChild(bar);
