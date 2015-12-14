//Sets specific CSS to respect frames dimensions
function fixPageStyle()
{
  //Body
  $("body").css("border", "0"); //No border
  $("body").css("margin", "0"); //No margin
  $("body").css("padding", "0"); //No padding

  //Top banner
  $("#banniere").css("height", "75px"); //Set height to 75px

  //Left menu
  $("#sommaire").css("width", "180px"); //Set width to 180 px
  $("#sommaire").css("float", "left"); //Float left

  //Main content
  $("#principal").css("overflow", "hidden"); //Float right
}

function convertFramesToDivs()
{
  //Adds a body to the page
  $("html").append($("<body></body>"));

  //Replaces all frame with a corresponding div in the body
  //Copies name attribute of frame to id of div
  $("frame").each(function() {

    //Append new div
    $("body").append("<div id='" + $(this).attr("name") + "'>" + $(this).contents().find("body").html() + "</div>");
  });

  //Removes frameset
  $("frameset").remove();

  //Fixes page style after switching to divs
  fixPageStyle();
}

self.port.on("exec", function(){
  convertFramesToDivs()
})
