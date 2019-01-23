function createParagraph(text, className)
{
	var element = document.createElement("P");
	var textNode = document.createTextNode(text);
	
	element.appendChild(textNode);
	
	if(typeof className !== "undefined")
		element.classList.add(className);
	
	return element;
}

function createPopup(popupText, arrayOfObjects)
{
	//create a popup div
	var popupDiv = createDiv("popup");
	
	//create a div that will contain content.
	var popupContentDiv = createDiv("popup-content");
	
	//check whether a string is passed or a table containing scores is passed.
	if(typeof popupText == "string") 
		//create a content paragraph if string is passed.
		var content = createParagraph(popupText);
	else
		//Do nothing because a score table is passed.
		var content = popupText;
	
	popupContentDiv.appendChild(content);
	popupDiv.appendChild(popupContentDiv);
		
	for(var i=0; i < arrayOfObjects.length; i++)
	{
		var button = createButtonDiv(arrayOfObjects[i].name, "popupButtons", arrayOfObjects[i].func);
		popupContentDiv.appendChild(button);
	}
	
	document.body.appendChild(popupDiv);
	return popupContentDiv;
}

function createButtonDiv(text, className, listenerFunction)
{
	var element = createDiv(className, text);
	
	if(typeof listenerFunction !== "undefined")
		element.onclick = listenerFunction;
	
	return element;
}

function backButtonDiv(listenerFunction, appendPosition)
{
	var element = createButtonDiv("Back", "backButton", listenerFunction );
	
	document.body.firstChild.appendChild(element);
}

function createDiv(className, text)
{
	var element = document.createElement("DIV");
	
	//Temporarily add to the body. When appendChild function will be used in the program then
	//the element will be moved from body to appropriate location. 
	document.body.appendChild(element);
	if(typeof className !== "undefined")
		element.classList.add(className);
	if(typeof text !== "undefined")
	{
		var textNode = document.createTextNode(text);
		element.appendChild(textNode);
	}
	
	
	return element;
}

function createBasicUIScreen( hasBackButton, listenerFunction, classForCenterDiv, headingContent, headingClass) 
{
	//clear the screen
	document.body.innerHTML = "";
	
	//Main Basic UI(theme)
	var basicUIDiv = createDiv("basicUIDiv");
	
	//check if backButton should be appended.
	if(hasBackButton)
		backButtonDiv(listenerFunction, basicUIDiv);
	
	if(typeof classForCenterDiv !== "undefined")
		var centerUIDiv = createDiv(classForCenterDiv);
	else
		var centerUIDiv = createDiv("centerUIDiv");	
	
	if(typeof headingContent !== "undefined")
	{
		var heading = createParagraph(headingContent, headingClass);
		centerUIDiv.appendChild(heading);
	}
	
	
	basicUIDiv.appendChild(centerUIDiv);
	
	return centerUIDiv;
}

function createMusicButton()
{
	var musicButton = createDiv("pauseButton");
	var src;
	if(window.localStorage.getItem("music") == "true")
		src = "icons/musicon.svg";
	else
		src = "icons/musicoff.svg";
	
	window.musicImage = createImage(src, "music");
	musicButton.appendChild(musicImage);
	
	musicButton.onclick = toggleMusic;
	return musicButton;
}

function toggleMusic()
{
	if(window.localStorage.getItem("music")== "true")
		{
			src = "icons/musicoff.svg";
			musicImage.setAttribute("src", src);
			audio.pause();
			window.localStorage.setItem("music", "false");
		}
		else
		{
			src = "icons/musicon.svg";
			musicImage.setAttribute("src", src);
			audio.play();
			window.localStorage.setItem("music", "true");
		}
}

function createImage(imageLocation, className)
{
	var element = document.createElement("IMG");
	element.setAttribute("src", imageLocation);
	
	if(typeof className !== "undefined")
		element.classList.add(className);
	//document.body.appendChild(element);
	return element;
}

function showTutorials()
{	
	document.body.innerHTML = "";
	createPopup("A tutorial video contains the details on how to play. If playing on a small device then please view it in landscape mode for better experience",
		[{name:"OK", func: function(){this.parentElement.parentElement.style.visibility="hidden";}}]);
	var button = createButtonDiv("DONE","backButton",loadGame);
	var video = document.createElement("VIDEO");
	video.setAttribute("src","tutorials/tuts.mp4");
	video.setAttribute("controls", "controls");
	video.setAttribute("width", "100%");
    video.setAttribute("height", "100%");
	video.muted = true;
	document.body.appendChild(video);
	document.body.appendChild(button);
}
