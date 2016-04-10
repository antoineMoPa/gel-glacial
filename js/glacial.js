var releaseList = [];
var collaboratorList = [];
var licenseText;
		
//Create a new Releasem object
function Release(rel)
{
	this.name = rel.name;
	this.zip = rel.tarball_url;
	this.tarball = rel.zipball_url;
	
	var ff = undefined;
	var cr = undefined;
	
	rel.assets.forEach( function(element, array, index) {
			var temp = element.browser_download_url.split(".");
			if(temp[temp.length - 1] == "xpi")
			{
				//Firefox XPI
				ff = element.browser_download_url;
			}
			else if(temp[temp.length - 1] == "crx")
			{
				//Chrome CRX
				cr = element.browser_download_url;
			}
		}			
	);
	
	this.firefox = ff;
	this.chrome = cr;
}

function Collaborator(data)
{
	this.login = data["login"];
	this.name = data["name"];
	this.avatar = data["avatar_url"];
	this.url = data["html_url"];
}

function getPreferredRelease()
{
	var i = 0;
	var done = false;
	var result = undefined;
	
	while(!done && (i < releaseList.length))
	{
		if((!isMobile.any()) && (BrowserDetect.browser == "Firefox") && (releaseList[i].firefox !== undefined))
		{
				result = releaseList[i];
				done = true;		
		}
		else if((!isMobile.any()) && (BrowserDetect.browser == "Chrome") && (releaseList[i].chrome !== undefined))
		{
				result = releaseList[i];
				done = true;
		}
		else
		{
			result = releaseList[i];
		}
		
		i++;
	}
	
	return result;
}

function getReleases(callback)
{
	$.getJSON("https://api.github.com/repos/antoineMoPa/glacial/releases", "",
	function(data, textStatus, jqXHR) {
		
		for(var i = 0; i < data.length; i++)
			releaseList.push(new Release(data[i]));
		
		callback();
	});
}

function getCollaborators(callback)
{
	var collabCount;
	
	//Fetch collaborators list
	$.getJSON("https://api.github.com/repos/antoineMoPa/glacial/stats/contributors", "",
				function(data, textStatus, jqXHR) {
					collabCount = data.length;
					data.forEach(function(element, array, index) {
						
						//Fetch collaborators profiles
						$.getJSON("https://api.github.com/users/" + element["author"]["login"], "",
						function(data, textStatus, jqXHR) {
							collaboratorList.push(new Collaborator(data));
							
							//We're done downloading profile information
							if(collaboratorList.length == collabCount)
								callback();
						});
					});
		}
	);
}

function getLicense(callback)
{
	$.get("https://raw.githubusercontent.com/antoineMoPa/glacial/master/LICENSE", "",
				function(data, textStatus, jqXHR) {
					licenseText = data.replace("<", "&lt;").replace("<", "&gt;"); 
					callback();
				}, "text");
}