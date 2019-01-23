//Funtion that gets called when HTML is loaded.
window.loadApp = function() {
	//load the music.
	music();
	
	//load the game
	loadGame();
}

/*	
	This function does not take any parameters and does not return any thing.

	This function is used to display the home page of the game.
	It will append all the buttons. 
		
	This function checks whether the user is playing the game for the first time or not.
	If its the first time it performs some actions.
	
	//calling the function.
		loadGame();
*/
function loadGame()
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
	var centerUIDiv = createBasicUIScreen(false, undefined, undefined,"Memory Game", "heading");
	
	/*
		create a music button div with image of pause and play
		that toggles between play and pause.
		
		Here we have called createMusicButton() that does not take any parameters.
		It returns a button with the image of pause or play and has onclick
		listener attached to it. So clicking the button will on & off the music.
	*/
	var musicButton = createMusicButton();
	musicButton.classList.add("musicButton");
	
	//Create a Play button with class set to "menuButtonsDiv" and passing a function that 
	//will be attached to the play button.
	var okButtonDiv = createButtonDiv("Play", "menuButtonsDiv", showCategories);
	centerUIDiv.appendChild(okButtonDiv);
	
	//Create a scoreboard button with class set to "menuButtonsDiv" and passing a function that 
	//will be attached to the scoreboard button.
	var scoreButtonDiv = createButtonDiv("Scores", "menuButtonsDiv", showScoreBoard);
	centerUIDiv.appendChild(scoreButtonDiv);
	
	//Create a tutorials button with class set to "menuButtonsDiv" and passing a function that 
	//will be attached to the tutorials button.
	var tutorialsButtonDiv = createButtonDiv("Tutorials", "menuButtonsDiv", showTutorials);
	centerUIDiv.appendChild(tutorialsButtonDiv);
	
	//Create a settings button with class set to "menuButtonsDiv" and passing a function that 
	//will be attached to the settings button.
	var settingsButtonDiv = createButtonDiv("Settings", "menuButtonsDiv", showSettings);
	centerUIDiv.appendChild(settingsButtonDiv);	
	
	
	/*
		check whether the game is being loaded for the first time.
		If its loaded for the first time then ask whether the user wants to turn music on or not.
		Then ask whether he/she wants to watch the tutorials or not.
		And redirect him/her to the according to the selection.
	*/
	if(window.localStorage.getItem("firstTimeLoad") === null || window.localStorage.getItem("firstTimeLoad").length == 0 )
	{
		//Ask the user whether they want to watch the tutorials or not.
		createPopup("Do you want to watch the tutorials first?", [
			{
				name: "Yes",
				func: showTutorials
			},
			{
				name: "No",
				func: loadApp
			},
		]);
		//Ask for the music.
		musicPopup();
		//Set the firstTimeLoad to false so that next time user is not asked.
		window.localStorage.setItem("firstTimeLoad","false");
	}
}


/*
	This function does not take any parameter and does not return any value.
	
	This function is used to display the scores of the user.
	It displays a table that contains all the category scores.
	
	//calling the function
		showScoreBoard();
*/
function showScoreBoard()
{
	//create a table to display the scores for different categories.
	var scoreTable = document.createElement("Table");
	
	//create a table header for category and score labels.
	var tableHeader = scoreTable.createTHead();
	var headerRow = tableHeader.insertRow(0);
	var cell1 = headerRow.insertCell(0);
	cell1.innerHTML = "Category";
	var cell2 = headerRow.insertCell(1);
	cell2.innerHTML = "Total Score";
	
	//create a table body.
	var tableBody = scoreTable.createTBody();
	
	for(var i = 0; i < window.categories.length; i++)
	{
		//Get the score for current category from localStorage.
		var score = window.localStorage.getItem(window.categories[i] + "Score");
		
		//create a row and insert 2 cell. one for category name and other for score. 
		var newRow = tableBody.insertRow(i);
		var categoryCell = newRow.insertCell(0);
		//convert the first letter to uppercase.
		categoryCell.innerHTML = window.categories[i].charAt(0).toUpperCase() + window.categories[i].slice(1);
		var scoreCell = newRow.insertCell(1);
		scoreCell.innerHTML = score;
	}
	
	createPopup(scoreTable, [
		{
			name: "Close",
			func: function() {
					this.parentElement.parentElement.style.visibility = "hidden";
				} 
		}
	]);
}

/*
	This function does not take any parameter and does not return any value.
	
	This function is used to display the settings page.
	It displays various options to the user.
	User can reset a category, reset all categories or change music settings.
	
	//calling the function
		showScoreBoard();
*/
function showSettings()
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
	var centerUIDiv = createBasicUIScreen(true, window.loadGame, undefined, "Settings", "labels");
	
	//create a button div with text "Reset Category" with class "menuButtonsDiv" and
	//onclick listener set to the function resetACategory.
	var resetButtonDiv = createButtonDiv("Reset Category", "menuButtonsDiv", resetACategory);
	
	//create a button div with text "Reset All Categories" with class "menuButtonsDiv" and
	//onclick listener set to the function resetAll.
	var resetGameButtonDiv = createButtonDiv("Reset All", "menuButtonsDiv", resetAll);
	
	/*
		create a button div with text "Music" with class "menuButtonsDiv" and
		onclick listener set to show the popup.
		We are passing a function that checks whether the music is playing or not
		and acts accordingly.
	*/
	var musicOptions = createButtonDiv("Music", "menuButtonsDiv", function() {
		if(window.localStorage.getItem("music") == "true")
			var musicString = "Music : On";
		else
			var musicString = "Music : Off";
			
		var popup = createPopup("Music Settings", [
			{
				name: musicString,
				func: function() {
					toggleMusic();
					if(musicString === "Music : On")
					{	
						musicString = "Music : Off";
						this.innerHTML = musicString;
					}
					else
					{
						musicString = "Music : On";
						this.innerHTML = musicString;
					}
				}
			}
		]);
		
		
		//create a close button.
		var closeButton = createButtonDiv("X", "close", function() {this.parentElement.parentElement.style.visibility = "hidden";});
		popup.insertBefore(closeButton, popup.firstChild);
		
		//create a volume slider to control the volume.
		var volumeSlider = document.createElement("INPUT");
		volumeSlider.setAttribute("type", "range");
		volumeSlider.value = 5;
		volumeSlider.oninput = function() { audio.volume = volumeSlider.value/100;};
		volumeSlider.onchange = function() { audio.volume = volumeSlider.value/100;}; 
		popup.appendChild(volumeSlider);
	});
	
	// about div for attributions
	var aboutDiv = createButtonDiv("About", "menuButtonsDiv", function(){
		createPopup( "Music by Eric Matyas www.soundimage.org", 
			[{
				name: "Close", func: function(){
					this.parentElement.parentElement.style.visibility="hidden";
				}
			}]
		);
	});
	
	//append these buttons.
	centerUIDiv.appendChild(resetButtonDiv);
	centerUIDiv.appendChild(resetGameButtonDiv);
	centerUIDiv.appendChild(musicOptions);
	centerUIDiv.appendChild(aboutDiv);
}

