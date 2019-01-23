// This variable is used to store the current level.
window.currentLevel;

//These are used to store time that has passed since the level started.
//Used for timer div.
window.minutes;
window.seconds;

//This variable stores the number of moves made by user.
window.moves = 0;

//This variable stores the current level's score.
window.score = 0;

/*
	This is the score multiplier. 
	When user gives correct answers continuously then this variable is increased.	
*/
window.scoreMultiplier = 1;

//This is an array that contains all the currently open cards.
window.currentlyOpenCards = [];

//This array contains all the cards in the current level.
window.cards = [];

//Number of correct answers given by user.
window.correctNumberOfAnswers = 0;

//This is used to store the user selected category.
window.currentlySelectedCategory;

/*
	This function takes a parameter which is the level number the user selected.
	
	This function returns an anonymous function that stores the level which the user has selected
	in the currentLevel variable and then calls the startGame() method.
	
	//calling the function. 
		selectedLevel(3);
*/
function selectedLevel(userSelectedLevel)
{
	return function() {
		window.currentLevel = userSelectedLevel;
		startGame();
	}
}

/*
	This function accepts a category name as a paramter.
	
	This function returns an anonymous function that is used to display the levels for the user
	selected category. 
	
	If the user is playing the category for the first time then it initializes the level number
	and the score for that category else it retrieves the level number from local storage. 
	
	Loop is used to generate the levels that are available for that category.
	
	//calling the function
	1.	categorySelectOnClick("maths");
		
	2.	categorySelectOnClick("animals");
	
*/
function categorySelectOnClick(categoryName)
{
	return function() {
		
		//check if the user selected category has been initialized or not. 
		if(window.localStorage.getItem(categoryName) == null)
		{
			/*
				Its not stored. 
				So initialise the current level as 1 and store in local storage. 
				Also set the total score for that category to 0.
			*/
			window.currentLevel = 1;
			window.localStorage.setItem(categoryName,"1");
			window.localStorage.setItem((categoryName + "Score"),"0");
		}
		else
		{
			//Get the level number from the storage and assign to current level.
			window.currentLevel = parseInt(window.localStorage.getItem(categoryName));
		}
		
		//store the user selected category in window.currentlySelectedCategory.
		window.currentlySelectedCategory = categoryName;
				
		/*
			call the createBasicUIScreen to create a basic UI.
			It can take upto 5 parameters. 
			
			The first one specifies whether the screen has a back button or not.
			If there is a back button then we pass the function as second parameter to assign it to the onclick listener 
			that must execute when back button is pressed.
			
			Third parameter states the class name for center div if its other than centerUIDiv class.
		*/
		var centerUIDiv = createBasicUIScreen(true, window.showCategories, "levelScreenCenterUIDiv");
		
		/*
			Declare a variable i outside of the loop because it will be used for next loop.
			
			First loop is run till the levels user has played i.e. already completed. 
		*/
		var i = 1;
		for(; i <= window.currentLevel; i++)
		{			
			/*
				createButtonDiv is a function that takes 3 parameters.
				The first is text on the button, second is the class that needs to be added to the button and 
				third is the function that must be attached to the onclick listener.
				
				create a level button div with text i(level number) and with class "levelNumberBox"
				and pass a function to attach to onclick listener.
				Here we are calling the selectedLevel(i) which will return an anonymous function
				that will be linked to the onclick event.
			*/
			var levelNumberBox = createButtonDiv(i, "levelNumberBox", selectedLevel(i));
			
			//append the level button to the centerUIDiv.
			centerUIDiv.appendChild(levelNumberBox);
		}
		
		/*
			This is done so that category name can be evauated because we need to use that
			as an array name. window.selected variable must be used for this.
			Our data is stored in an array whose name is the name of the category.
		*/
		selected = eval(categoryName);
		
		/*	
			selected is used because all the categories contains fixed number of levels but the maths category
			generates new levels when the previous level is cleared (number of levels are not fixed).
			
			This loop is used to display the levels that can be played in a category but are locked right now. 
			(for all categories except maths category).
			
			-2 is done because the each level contains 2 more pairs of question & answer than the level number.
			So for the 1st level there are 3 question & answer pair. 
			For 2nd level there are 4 question & answer pair and so on.
			So reduce 2 to calculate total number of levels in a category.
		*/	
		for(; i <= window.selected.length - 2; i++)
		{
			/*
				Again createButtonDiv is called. 
				Create a button div with text i(level number) with class "lockedLevelNumberBox".
				Note that here we are not passing any function because we dont want the user to play 
				the levels that are locked.
			*/	
			var levelNumberBox = createButtonDiv(i, "lockedLevelNumberBox");
			centerUIDiv.appendChild(levelNumberBox);
		}	
	}
}

/*
	This function will display all the categories that the user can select to play.
	It generates the categories dynamically i.e. from the categories array.
	If a new category is added to the data file then the category will automatically be shown here.
	
	This function doen not take a parameter and does not return anything.
	// calling the function
		showCategories();
*/
function showCategories()
{	
	/*
		call the createBasicUIScreen to create a basic UI.
		It takes 5 optional parameters. The first one specifies whether the screen has back button.
		
		If there is a back button then we pass the function as second parameter
		that must execute when back button is pressed.
		
		Third parameter states the class name for center div if its other than centerUIDiv.
		We send undefined because we want the default class i.e. centerUIDiv.
		
		The fourth parameter takes the heading/labels text that must be displayed at the top of the buttons.
		
		The fifth parameter is the class name for the above heading/labels.
	*/
	var centerUIDiv = createBasicUIScreen(true, loadGame, undefined, "Categories", "labels");
	
	//Loop through all the categories in the window.categories array. 
	for(var i = 0; i < window.categories.length; i++)
	{
		//Convert the first letter to uppercase.
		var categoryName = window.categories[i].charAt(0).toUpperCase() + window.categories[i].slice(1);
		
		/*
			create a category button div with text as category name and with class "categoryBox"
			and pass a function to attach to onclick listener.
			Here we are calling categorySelectOnClick(window.categories[i]) that will return an
			anonymous function which will be attached to the onclick listener.
		*/
		var categoryButton = createButtonDiv(categoryName, "categoryBox", categorySelectOnClick(window.categories[i]));
		centerUIDiv.appendChild(categoryButton);
	}
}

/*
	This function takes a paramter card and returns nothing.
	
	This function is called to close the card if the card does not match with the other card.
	
	This function closes the cards that is currently open.
	After few seconds of delay the card is closed
	and notMatched class is removed from the classList.
	
	//calling the function
		card is basically a list item with class card.	
		
		resetCard(card);
		
*/
function resetCard(card)
{
	setTimeout( function() {
					card.innerHTML = "";
					card.classList.remove("notMatched");
				},1200);
}

/*
	This function does not take any parameters and does not return anything.
	
	This function will be called only if the user has completed the last level in a particular category.
	
	It is done to handle the error so that the user can't go to next level if there is no next level.
	
	It will only have 2 options:
		1. Select another category.
		2. Go to main menu.
		
	//calling the function.
		categoryCompletedPopup();	
*/
function categoryCompletedPopup()
{	
	/*
		createPopup method is called to dislpay a popup. It takes 2 parameters.
		
		The first paramter is the message to display in the popup.

		And the second parameter is an array that contains objects.
		Objects contain a name and a function.
		It will be used to provide the details to the buttons on the popup.
		Name will be used to display the text on the button.
		And the function will be attached to the onclick listener for that button.
	*/
	createPopup("Congrats, You have Cleared Every Level in this Category!!!", [
		{
			name: "Select Another Category",
			func: showCategories
		},
		{
			name: "Go to Menu",
			func: loadGame
		}
	]);
}

/*
	This function takes 2 parameters: 
		1. timerDiv i.e. where to update the time.
		1. restart boolean that is used to indicate whether the timer need to restart	
			or continue from the previous time.
			
	This function will be called when a level is started.
	
	Global variables are used so that the timer can be paused, resumed or restarted.  
	
	//calling the function.
		startTimer(divName, true); // To restart the timer
		
		startTimer(divName, false); // To resume the timer
*/
function startTimer(timerDiv,restart)
{	
	if(restart == true)
	{
		//Generally when a new level is loaded.
		//If restart is true set variables to zero.
		window.minutes = 0, window.seconds = 0;
	}	
	
	//Every second this function is called to increase the timer.
	//It is stored in a variable so that it can be paused, resumed, or cleared.
	window.timerInterval = setInterval( function() {
		//increase seconds.
		window.seconds++;
		
		//check if seconds is 60 then increase minutes and reset seconds to 0.
		if(window.seconds == 60)
		{
			window.minutes++;
			window.seconds = 0;
		}
		
		//Show the timer. If min or sec are single digit then append a 0 at the begining.
		timerDiv.innerHTML = "Time: " + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
			
	},1000);
}

/*
	This function does not take any parameters but returns a scoreBarDiv.
	
	This function is used to generate a score bar.
	It will contain a pause button, music button,, number of moves, timer, and score.
	
	//calling the function.
		scoreBarDisplay();
*/
function scoreBarDisplay()
{
	//create a div that will contain everything with the class as scoreBar.
	var scoreBarDiv = createDiv("scoreBar");
		
	/*
		create a pause button div with text "II" and with class "pauseButton"
		and pass a function to attach to onclick listener.
		Here we have passed pausePopup function.
	*/
	var pauseDiv = createButtonDiv("I I", "pauseButton", pausePopup);
	
	/*
		create a music button div with image of pause and play
		that toggles between play and pause.
		
		Here we have called createMusicButton() that does not take any parameters.
		It returns a button with the image of pause or play and has onclick
		listener attached to it. So clicking the button will on & off the music.
	*/
	var musicButton = createMusicButton();
	
	
	/*
		create a div that will show number of moves made by the user.
		Attach "moves" class to the div.
		Set the text initially to 0.
	*/
	window.movesDiv = createDiv("moves");
	window.movesDiv.innerHTML = "Moves: 0";
	
	/*
		create a div that will show the score for the current level.
		Attach "moves" class to the div. 
		(moves classhas the same properties we want for score div).
		Set the text initially to 00.
	*/
	window.scoreDiv = createDiv("moves");
	scoreDiv.innerHTML = "Score: 00";
	
	/*
		create a div that will show the time ellapsed for the current level.
		Attach "timer" class to the div. 
		Set the text initially to 00.
	*/
	window.timerDiv = createDiv("timer");
	timerDiv.innerHTML = "Time: 00:00"; 
	//call the timer function and pass true as a new level is loaded.
	startTimer(timerDiv,true);
	
	//append everything to the scoreBarDiv.
	scoreBarDiv.appendChild(pauseDiv);
	scoreBarDiv.appendChild(musicButton);
	scoreBarDiv.appendChild(timerDiv);
	scoreBarDiv.appendChild(window.movesDiv);
	scoreBarDiv.appendChild(scoreDiv);
	
	//return the score bar so that it can be appended when the game is started. 
	return scoreBarDiv;
}

/*
	This function does not take any parameters and does not return anything.
	
	This function is called when the user presses pause button.
	It will display a popup that will contain Game Paused text and 
	will display 4 options: resume, restart, Select another level or go to main menu
	
	//calling the function.
		pausePopup();
*/
function pausePopup()
{
	/*
		We dont want to count the time when the user has paused the game.
		So clear the interval so that the timer is paused.
	*/
	clearInterval(window.timerInterval);
	
	/*
		createPopup method is called to dislpay a popup. It takes 2 parameters.
		
		The first paramter is the message to display in the popup.

		And the second parameter is an array that contains objects.
		Objects contain a name and a function.
		It will be used to provide the details to the buttons on the popup.
		Name will be used to display the text on the button.
		And the function will be attached to the onclick listener for that button.
	*/
	createPopup("Game Paused !!", [
		{
			name: "Resume",
			func: function() {
					/*
						When the user presses the resume button we want to hide the popup.
						this.parentElement.parentElement.style.visibility is used.
						this refers to the resume button. Its parent is popupContentDiv
						whose parent is the main popupDiv.
						popupDiv -> popupContentDiv -> ResumeButton.
						So we want the popupDiv that contains everything to hide.
					*/
					this.parentElement.parentElement.style.visibility = "hidden";
					
					/*
						call the timer function and pass false so that timer can resume.
						false is passed because we want to resume the timer from where the user paused it.
					*/
					startTimer(timerDiv,false)
				}
		},
		{
			name: "Restart",
			func: function() {
					//If the level is restarted then reset all the variables and then start the game again.
					resetVariables();
					startGame();
				}
		},
		{
			// If the user wants to play another level dislpay all the levels.
			name: "Select Level",
			func: categorySelectOnClick(window.currentlySelectedCategory)
		},
		{
			// Go to main menu.
			name: "Menu",
			func: loadGame
		}
	]);
}

/*
	This function does not take any parameters and does not return anything.
	
	This function is used to display a popup when the user has completed a level.
	
	If it was a maths category then show the normal popup as maths category can have unlimited 
	levels because they are dynamically generated. 
	
	But if it was any other category then check whether it was the last level.
	If so then call categoryCompletedPopup method. Else just display popup.
	
	// calling the function.
		displayPopup();
*/
function displayPopup()
{
	//check the category.
	if(window.currentlySelectedCategory != "maths")
	{
		/*
			This is done so that category name can be evauated because we need to use that
			as an array name. window.selected variable must be used for this.
			Our data is stored in an array whose name is the name of the category.
		*/
		selected = eval(window.currentlySelectedCategory);
		
		/*
			If this is the last level then call categoryCompletedPopup() method 
			and then stop executing this function.
			
			+2 is done because the each level contains 2 more pairs of question & answer than the level number.
			So for the 1st level there are 3 question & answer pair. 
			For 2nd level there are 4 question & answer pair and so on.
			So add 2 to calculate total number of questions in a category.
		*/
		if(!(window.selected.length > window.currentLevel + 2))
		{
			categoryCompletedPopup();
			return;
		}
	}
	
	/*
		createPopup method is called to dislpay a popup. It takes 2 parameters.
		
		The first paramter is the message to display in the popup.

		And the second parameter is an array that contains objects.
		Objects contain a name and a function.
		It will be used to provide the details to the buttons on the popup.
		Name will be used to display the text on the button.
		And the function will be attached to the onclick listener for that button.
	*/
	createPopup("Congrats, Level Cleared !!", [
		{
			name: "Next Level",
			func: startGame
		},
		{
			name: "Replay",
			func: function() {
					//When the game is finished the currentLevel variable is increased
					//So if user wants to replay this level then decrease 1.
					window.currentLevel--;
					startGame();
				}
		},
		{
			name: "Categories",
			func: showCategories
		},
		{
			name: "Menu",
			func: loadGame
		}
	]);
}

/*
	This function takes a parameter text and returns and anonymous function.
	
	This function returns an anonymous function that binds with the calling element to display the text. 
	When this function is called the card displays the text.(The card is opened). 
	
	//calling the function.
		revealCard("30"); //For maths category.
		
		revealCard("cat"); //For animals category.
*/
function revealCard(text)
{
	return function(event) {
		//Increase the number of moves.	
		window.moves++;
		
		//Moves are calculated in pairs i.e. when 2 cards are either matched ot not matched this
		//will be counted as 1 move. So divide it by 2 and get the floor to represent as integer.
		window.movesDiv.innerHTML = "Moves: " + Math.floor(window.moves/2);
		
		//add the card that is opened to currentlyOpenCards array.
		currentlyOpenCards.push(event.target);
		
		// Add the disable class so that the same card cannot be clicked again.
		event.target.classList.add("disable");
		event.target.classList.add("open");
		
		/*
			Display the text of the card that is clicked.
			check isImageLI variable whether the card that was click contains an image
			else check is it a normal card.
		*/
		if(event.target.isImageLI == true)
		{
			//If its an image then create an image element and append it to the target.
			var questionImage = createImage(text);
			questionImage.classList.add("cardImages");
			event.target.appendChild(questionImage);
		}
		else 
		{	
			//If its just a para then add the paragraph text.
			var textNode = document.createTextNode(text);
			event.target.appendChild(textNode);
		}
		
		//Check if 2 cards have been clicked or opened.
		if(currentlyOpenCards.length == 2)
		{
			
			// Disable all the cards for few seconds to check whether
			// the cards match or not and take proper action.			
			for(var j = 0; j < cards.length; j++)
			{
				cards[j].classList.add("disable");
			}
			
			/*
				To display green or red colour in images so that the user can know its correct or not.
			*/
			if(currentlyOpenCards[0].childNodes[0].nodeName == "IMG")
				currentlyOpenCards[0].childNodes[0].classList.add("imageFlash");
			if(currentlyOpenCards[1].childNodes[0].nodeName == "IMG")
				currentlyOpenCards[1].childNodes[0].classList.add("imageFlash");				
			
			//if the cards are matched
			if(currentlyOpenCards[0].myTextID == currentlyOpenCards[1].myTextID)
			{
				//Increase the score for each correct answer. Give more points for continuous corect answer.
				window.score += 10 * window.scoreMultiplier;
				window.scoreDiv.innerHTML = "Score: " + window.score;
				/*
					Increase the scoreMultiplier if the user answers back to back correct answers
					so that he/she scores more points for answering correct answers continuously.
				*/
				window.scoreMultiplier++;
				
				// Increase the number of correct answers given by user.
				window.correctNumberOfAnswers++;
				
					
				//Add "matched" class to the cards that are matched.
				currentlyOpenCards[0].classList.add("matched");
				currentlyOpenCards[1].classList.add("matched");
				// remove the card from currentlyOpenCards so that they dont get reset in next part.
				// we remove them in the order they arrived i.e. queue.
				currentlyOpenCards.shift();
				currentlyOpenCards.shift();
				
			}
			else
			{
				//if player answers wrong answer then reset the scoreMultiplier.
				window.scoreMultiplier = 1;
				
				//If cards are not a match.
				//Add "notMatched" class to these cards.
				currentlyOpenCards[0].classList.add("notMatched");
				currentlyOpenCards[1].classList.add("notMatched");
				
				//Remove the open class. i.e. white background.
				currentlyOpenCards[0].classList.remove("open");
				currentlyOpenCards[1].classList.remove("open");
				// Remove the cards from the queue and send the card to resetCard method.
				var card = currentlyOpenCards.shift();
				resetCard(card);
				card = currentlyOpenCards.shift();
				resetCard(card);
				
			}			
			
			//Enable all the cards after few seconds
			setTimeout(function(){for(var j = 0; j < cards.length; j++)
								cards[j].classList.remove("disable");
			},1300);
			
			// Check the number of correct answers with the possible correct answers
			// Suppose the current level is 5 then 5 + 2 is 7. So there are 7 pairs of question and answer.
			// So check how many pairs of answers user has got right.
			if(window.correctNumberOfAnswers == window.currentLevel + 2)
			{
				/*
					This means the user has got all answers right.
					Reset the correct answers variable, increase current level, push new data to local storage.
					Display alert box to user and then start the next level.
					Timeout function is used to let the card animation complete.
				*/
				setTimeout(function(){
					
					//Increase the currentLevel only if there are more levels that can be played.
					if(window.selected.length > currentLevel + 2)
						window.currentLevel++;
					
					//If its a maths category then increase the level as maths category can have as many levels as we want.
					if(currentlySelectedCategory == "maths")
						window.currentLevel++;
					
					//If the user has already cleared more levels than the current level then do nothing.
					//Else set the next level to be currentLevel.
					if(window.localStorage.getItem(currentlySelectedCategory) < currentLevel)
					{
						window.localStorage.setItem(currentlySelectedCategory,currentLevel);
						//Add the current level score to the total score for category.
						var totalScore = parseInt(window.localStorage.getItem(currentlySelectedCategory + "Score"));
						totalScore += window.score;
						window.localStorage.setItem((currentlySelectedCategory + "Score"),("" + totalScore));
					}
					
					//reset all the variables.
					resetVariables();
					
					displayPopup();
				},2000);
			}
		}
	}
}

/*
	This function does not take any parameters and does not return anything.
	
	This function is called when we want to reset all the variables.
	Like it will be called when new level is loaded or same level is restarted.
	
	This function resets all the variables.
	
	//calling the function.
		resetVariables();
*/
function resetVariables()
{
	window.currentlyOpenCards = [];
	window.scoreMultiplier = 1;
	window.cards = [];
	window.correctNumberOfAnswers = 0;
	window.score = 0;
	window.moves = 0;
	window.minutes = 0;
	window.seconds = 0;
	clearInterval(window.timerInterval);
}


/*
	This function takes 3 parameters:
		First is the question card.
		Second is the answer card.
		Third is the loop counter when they were generated.
		
	It is used to add cards to the cards array to keep track of all the cards in current level. 
	Also it assigns the ques & ans card the same id (loop counter) so that they 
	can be checked whether they are correct pair or not.
	
	//calling the function.
		addCardToArray(ques,ans,5);
		addCardToArray(ques,ans,10);
		Here ques and ans are list items with class cards.
*/
function addCardToArray(ques,ans,i)
{
	//Set a unique id so that it can be used to check if they are correct question and answer pair.
	ques.myTextID = i;
	ans.myTextID = i;
	
	//Push them to the cards array.
	cards.push(ques);
	cards.push(ans);
}

/*
	This function takes an unordered list as a parameter and returns an unordered list.
	
	This function is used to shuffle the cards so that they are not in the order they are generated
	We require shuffling because we are generating question and answer pair together and they will be added
	in order so to avoid this shuffling is done.
	
	This is the Fisher-Yates shuffling algorithm that is optimised for computers.(Complexity is reduced to O(n)).
	
	//calling the function.
		shuffleCards(unorderedList);
*/
function shuffleCards(ulElement)
{
	// get the number of elements present in the list(i.e. number of cards).
	var length = ulElement.children.length;
	
	/*
		Create an array containing all the cards. 
		childNodes returns a NodeList and we cannot manipulate it.
		Hence we need an array to swap the positions.
	*/
	var liArray = Array.from(ulElement.childNodes);
	
	//Iterate through the array and swap the ith element with random element.
	for(var i = 0; i < length; i++)
	{
		//Generate a random number between i and the length of array.
		var randomNumber = Math.floor(Math.random() * (length - i)) + i;
		
		//Perform the swapping
		var temp = liArray[i];
		liArray[i] = liArray[randomNumber];
		liArray[randomNumber] = temp;
	}
	
	//Create a new unordered list
	var newULElement = document.createElement("UL");
	newULElement.classList.add("deck");
	
	//Add all the array elements to the unordered list.
	liArray.forEach(function(li) {
		newULElement.appendChild(li);
	})
	return newULElement
}


/*
	This function does not take any parameters and does not return anything.
	
	This function will start the game based on the category selected.
	It will show the scoreBar and the deck containing all the cards for that level.
	
	//calling the function.
		startGame();
*/
function startGame()
{
	//reset all the variables
	resetVariables();
	
	//get the user selected category.
	var category = window.currentlySelectedCategory;
	
	//clear the screen.
	document.body.innerHTML="";
	
	//Main Basic UI(theme)
	var basicUIDiv = createDiv("basicUIDiv");
	
	//Create a heading containing the name of the game.
	var heading = createParagraph("Memory Game", "heading");
	basicUIDiv.appendChild(heading);
	
	//append the score bar.
	basicUIDiv.appendChild(scoreBarDisplay());
	
	// Check which category the user has selected.
	//for maths special condition needs to be check as we are creating the contents for this category dynamically.
	if(category == "maths")
	{		
		// call the gererateMathsData() with current level to randomly generate questions and answers.
		// It returns number of question answer pair generated according to the level.
		var arrayLength = generateMathsData(currentLevel);
		
		/*
			This is done so that category name can be evauated because we need to use that
			as an array name. window.selected variable must be used for this.
			Our data is stored in an array whose name is the name of the category.
		*/
		selected = eval(category);
		
		//Create an unordered list to which all the cards will be added. Add the deck class.
		var ulElement = document.createElement("UL");
		ulElement.classList.add("deck");
		
		//Loop through the number of question & answer pair to display it in list item.
		for(var i =0; i < arrayLength; i++)
		{
			//Get the i th question and answer  
			var ques = window.selected[i].question;
			var ans = window.selected[i].answer;
			
			//Create a new Li for question and answer pair and add "card" class.
			var questionLI = document.createElement("li");
			questionLI.classList.add("card");
			var answerLI = document.createElement("li");
			answerLI.classList.add("card");
			ulElement.appendChild(questionLI);
			ulElement.appendChild(answerLI);
			
			//Add this pair of cards to the cards array to keep track of all the cards.
			addCardToArray(questionLI,answerLI,i);
			
			/*
				set onclick listners.
				revealCard method is passed either the question or answer based on the card clicked.
			*/	
			questionLI.onclick = revealCard(ques);
			answerLI.onclick = revealCard(ans);
		}
		
		//Call the shuffle card method to shuffle the cards.
		//replace the old list with new shuffled list.
		ulElement = shuffleCards(ulElement);
		
		//Append the new unordered list to the basicUIDiv.
		basicUIDiv.appendChild(ulElement);	
		
	}
	else
	{
		// If user selects any category other than Maths. 
		
		/*
			This is done so that category name can be evauated because we need to use that
			as an array name. window.selected variable must be used for this.
			Our data is stored in an array whose name is the name of the category.
		*/
		selected = eval(category);
		//Create an unordered list to which all the cards will be added. Add the deck class.
		var ulElement = document.createElement("UL");
		ulElement.classList.add("deck");
		
		//Loop through the number of question & answer pair to display it in list item.
		for(var i =0; i < currentLevel + 2; i++)
		{
			// Get the i th question and answer  
			var ques = window.selected[i].question;
			var ans = window.selected[i].answer;
			
			//Create a new Li for question and answer pair and add "card" class.
			var questionLI = document.createElement("li");
			//Create a new boolean variable and set it true so as to later check whether it contains an image.
			questionLI.isImageLI = true;
			questionLI.classList.add("card");
			var answerLI = document.createElement("li");
			answerLI.classList.add("card");
			ulElement.appendChild(questionLI);
			ulElement.appendChild(answerLI);
			
			//Add this pair of cards to the cards array to keep track of all the cards.
			addCardToArray(questionLI,answerLI,i)
			
			/*
				set onclick listners.
				revealCard method is passed either the question or answer based on the card clicked.
			*/	
			questionLI.onclick = revealCard(ques);
			answerLI.onclick = revealCard(ans);
		}
		
		//Call the shuffle card method to shuffle the cards.
		//replace the old list with new shuffled list.
		ulElement = shuffleCards(ulElement);
		
		//Append the list to the basicUIDiv.
		basicUIDiv.appendChild(ulElement);
	}
}