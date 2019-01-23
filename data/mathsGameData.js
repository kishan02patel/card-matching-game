/*
	This file contains a function that is used to generate questions for the maths category.
	
	Create a global maths array that will store objects.
	Objects will contain question and answer.
*/
window.maths = [];

/*
	This function will take a level number and generate level + 2 number of questions.
	+2 is done so that there are in total 3 questions and 3 answers i.e. total of 6 cards minimum.
	The questions and answers are not hardcoded and are generated randomly each time.
	For each level the number of questions increases hence the array size will increase dynamically.
	Returns length of the array.
	
	syntax: gererateMathsData(levelNumber)
	
	Example: For level 2
				gererateMathsData(2);
				
			For level 5
				gererateMathsData(5);
*/
window.generateMathsData = function(level) {
	
	//Clear the array each time new level is loaded.
	window.maths = [];
	//Number of questions should be 2 greater than the level number.
	var noOfQues = level + 2;
	
	// Loop from 0 upto noOfQues.
	for(var i = 0; i < noOfQues; i++)
	{
		//Generate 2 random numbers between 1 and 20(excluding). 
		var num1 = getRandomNumber(1,20);
		var num2 = getRandomNumber(1,20);
		
		//Generate a random number for selecting the operator.
		var operator = getRandomNumber(0,5);
		
		//Select a operator based on random number
		switch(operator)
		{
			// ques variable stores a string so that it can be displayed in a question card.
			// ans variable calculates the value of the ques so that it can be displayed in an answer card.
			
			//Multiply
			case 0:
				var ques = num1 + " * " + num2;
				var ans = num1 * num2;
				break;
				
			//Divide and round off to 2 digits	
			case 1:
				var ques = num1 + " / " + num2;
				var ans = num1 / num2;
				ans = ans.toFixed(2);
				break;

			//Sum	
			case 2:
				var ques = num1 + " + " + num2;
				var ans = num1 + num2;
				break;
				
			//Difference	
			case 3:
				var ques = num1 + " - " + num2;
				var ans = num1 - num2;
				break;
				
			//Remainder	
			case 4:
				var ques = num1 + " % " + num2;
				var ans = num1 % num2;
				break;
		}
		
		// Push the object containg question & answer pair. 
		maths.push({question: ques, answer: ans });
	}
	
	//return the length of array.
	return maths.length;
};
