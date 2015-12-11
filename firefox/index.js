
firefox_init_button();
firefox_init_scripts();
e
function firefox_init_scripts(){
    // log level
    let sp = require('sdk/simple-prefs');
    sp.prefs['sdk.console.logLevel'] = 'all';
    
    
    var pageMod = require("sdk/page-mod");
    
    pageMod.PageMod({
        include: "*",
        contentScriptFile: "./main.js",
        contentStyleFile: "./style.css"
    });
}

function firefox_init_button(){
    var buttons = require('sdk/ui/button/action');
    var tabs = require("sdk/tabs");
    
    var button = buttons.ActionButton({
        id: "gel",
        label: "Gel USherbrooke",
        icon: {
            "16": "./icon-16.png",
            "32": "./icon-32.png",
            "64": "./icon-64.png"
        }        
    });
}
