firefox_init_button();

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
        },
        onClick: handleClick
    });
    
    function handleClick(state) {
        tabs.open("http://www.mozilla.org/");
    }
}
