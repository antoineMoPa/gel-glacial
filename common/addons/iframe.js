//Sets specific CSS to respect frames dimensions
function fixPageStyle()
{
  $("body").css("border", "0"); //No border
  $("body").css("margin", "0"); //No margin
  $("body").css("padding", "0"); //No padding

  //Top banner
  $("#banniere").css("height", "75px"); //Set height to 75px
  $("#banniere").css("border", "0"); //No border
  $("#banniere").css("margin", "0"); //No margin
  $("#banniere").css("padding", "0"); //No paddings

  //Left menu
  $("#sommaire").css("width", "180px"); //Set width to 180 px
  $("#sommaire").css("float", "left"); //Float left
  $("#sommaire").css("border", "0"); //No border
  $("#sommaire").css("margin", "0"); //No margin
  $("#sommaire").css("padding", "0"); //No padding

  //Main content
  $("#principal").css("overflow", "hidden"); //Float right
  $("#principal").css("border", "0"); //No border
  $("#principal").css("margin", "0"); //No margin
  $("#principal").css("padding", "0"); //No padding
}

function convertFramesToDivs()
{
  //Adds a body to the page
  $("html").append($("<body></body>"));

  //Replaces all frame with a corresponding div in the body
  //Copies name attribute of frame to id of div
  $("frame").each(function() {
    var frame_content = $(this).contents();
    $("head").append(frame_content.find("link")); //Copies stylesheets

    //Appends new div
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
