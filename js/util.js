/*
	this function is used to generate a random number between min and max(excluding).
	
	//calling the function
		getRandomNumber(0,10) // gets a random number between 0 and 10.
		
		getRandomNumber(50,100) // gets a random number between 50 and 100.
*/

function getRandomNumber(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; 
	//The maximum is exclusive and the minimum is inclusive
}