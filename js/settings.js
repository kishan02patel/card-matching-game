/*
	This function does not take any parameter and does not return any value.
	
	This function is used to display all the categories that a user can reset.
	
	//calling the function
		resetACategory();
*/
function resetACategory()
{
/*
		call the createBasicUIScreen to create a basic UI.
		It can take upto 5 parameters. 
		
		The first one specifies whether the screen has a back button or not.
		If there is a back button then we pass the function as second parameter to assign it to the onclick listener 
		that must execute when back button is pressed.
		
		Third parameter states the class name for center div if its other than centerUIDiv class.
		Here we have passed undefined as we want the default centerUIDiv class.
		
		The fourth parameter is the heading we want above the buttons.
		
		The fifth parameter is the class that we want to apply to the heading.
	*/
	var centerUIDiv = createBasicUIScreen(true, showSettings, undefined, "Reset A Category", "labels");
	
	//loop through all the categories in the window.categories array. 
	for(var i = 0; i < window.categories.length; i++)
	{
		//convert the first letter to uppercase.
		var categoryName = window.categories[i].charAt(0).toUpperCase() + window.categories[i].slice(1);
		
		//create a button div with text as category name with class "categoryBox"
		//and pass a function to attach to onclick listener.
		var categoryBox = createButtonDiv(categoryName, "categoryBox", resetDone(window.categories[i], true));
		
		centerUIDiv.appendChild(categoryBox);
	}
}

/*
	This function takes category name and a boolean and returns an anonymous function.
	Boolean variable defines whether the popup must be displayed or not.
	
	//calling the function
		resetDone("animals", true);
		
		resetDone("maths", false);
*/
function resetDone(categoryName, showPopup)
{ 
	return function()
	{
		window.localStorage.setItem(categoryName,"1");
		window.localStorage.setItem((categoryName + "Score"),"0");
		
		if(showPopup)
		{
			createPopup(categoryName.charAt(0).toUpperCase() + categoryName.slice(1) + " is now Reset!!", [
				{
					name: "Close",
					func: function() {
							this.parentElement.parentElement.style.visibility = "hidden";
					}
				}
			]);
		}
	}
}

/*
	This function does not take any parameter and does not return any value.
	
	This function is used to reset all the categories.
	
	//calling the function
		resetAll();
*/
function resetAll()
{
	//loop through all the categories.
	for(var i = 0; i < window.categories.length; i++)
	{
		resetDone(window.categories[i], false)();
	}
	
	createPopup("All the categories are now reset", [
		{
			name: "Close",
			func: function() {
					this.parentElement.parentElement.style.visibility = "hidden";
			}
		}
	]);
}

/*
	This function does not take any parameters and does not return any value.
	This is called when the user loads the game.
	It creates the audio element and sets some controls.
	It checks whether the music is set to playing or not.
	If playing then document.body.onclick is set so that when user clicks anywhere the audio starts playing.
	Because audio cannot be played without user interaction.
	
	// calling the function.
		musics();
*/
function music()
{
	var playlist = ["sounds/music1.mp3","sounds/music2.mp3","sounds/music3.mp3"];
	var songNumber = 0;
	window.audio = new Audio(playlist[songNumber]);
	audio.volume = 0.05;
	document.body.onclick = function(){
		if(window.localStorage.getItem("music") == "true")
		{
			audio.play();
			document.body.onclick = null;
		}
	};
	setInterval(function() {
		if(audio.ended)
		{
			songNumber++;
			if(songNumber >= playlist.length)
				songNumber = 0;
			
			audio.setAttribute("src",playlist[songNumber]);
			audio.load();
		}
	},audio.duration);
}

/*
	This function does not take any parameters and does not return any value.
	This is called when the user loads the game for the first time.
	
	// calling the function.
		musicPopup();
*/
function musicPopup()
{
	createPopup("Do you want to enable music ?", [
		{
			name: "Yes",
			func: function() { 
				audio.play(); 
				window.localStorage.setItem("music","true");
				this.parentElement.parentElement.style.visibility = "hidden";
			}
		},
		{
			name: "No",
			func: function() { 
				window.localStorage.setItem("music", "false");
				this.parentElement.parentElement.style.visibility = "hidden";
			}
		}
	]);
}