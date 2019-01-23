/*
	**This file contains the data for the game.
	
	**window.categories array stores all the categories that a user can play.
	It is used to keep track of the categories so that specific category array can be selected.
	
	**We could have used array of objects where each object would have a category name
	and an array containing the data but that would just become over complicated while 
	accessing the data.
	
	**This way is better because we can use categories array to display options available 
	and then based on selection we can retrieve the data from that specific array.
	
	**Each individual category array contains objects that have a question and an answer. 
	The question field contains the location of the image that will be displayed in the card.
	The answer is the name of the object that is displayed in question card.
	
	**To add a new category just write the category name in window.categories array and
	just like every individual category array create a new global array with category name
	and populate it with the data. Store the images in images/categoryName directory.
*/
window.categories = ["maths", "animals", "fruits", "car_Logos", "tech_Logos", "flags"];

window.fruits = [
	{
		question: "images/fruits/strawberry.jpg",
		answer: "Strawberry"
	},
	{
		question: "images/fruits/apple.jpg",
		answer: "Apple"
	},
	{
		question: "images/fruits/apricots.jpg",
		answer: "Apricots"
	},
	{
		question: "images/fruits/blueberries.jpg",
		answer: "Blueberries"
	},
	{
		question: "images/fruits/cherry.jpg",
		answer: "Cherry"
	},
	{
		question: "images/fruits/orange.jpg",
		answer: "Orange"
	},
	{
		question: "images/fruits/pineapple.jpg",
		answer: "Pineapple"
	},
	{
		question: "images/fruits/raspberries.jpg",
		answer: "Raspberries"
	},
	{
		question: "images/fruits/bananas.jpg",
		answer: "Banana"
	},
	{
		question: "images/fruits/pears.jpg",
		answer: "Pear"
	},
	{
		question: "images/fruits/custardapple.jpg",
		answer: "Custard Apple"
	},
	{
		question: "images/fruits/dragonfruit.jpg",
		answer: "Dragon Fruit"
	},
	{
		question: "images/fruits/mango.jpg",
		answer: "Mango"
	},
	{
		question: "images/fruits/gooseberry.jpg",
		answer: "Gooseberry"
	},
	{
		question: "images/fruits/grapefruit.jpg",
		answer: "Grapefruit"
	},
	{
		question: "images/fruits/grapes.jpg",
		answer: "Grapes"
	},
	{
		question: "images/fruits/guava.jpg",
		answer: "Guava"
	},
	{
		question: "images/fruits/jackfruit.jpg",
		answer: "Jackfruit"
	},
	{
		question: "images/fruits/papaya.jpg",
		answer: "Papaya"
	},
	{
		question: "images/fruits/plums.jpg",
		answer: "Plums"
	},
	{
		question: "images/fruits/pomegranate.jpg",
		answer: "Pineapple"
	},
	{
		question: "images/fruits/watermelon.jpg",
		answer: "Watermelon"
	}
];

window.animals = [
	{
		question: "images/animals/cat.jpg",
		answer: "Cat"
	},
	{
		question: "images/animals/cheetah.jpg",
		answer: "Cheetah"
	},
	{
		question: "images/animals/deer.jpg",
		answer: "Deer"
	},
	{
		question: "images/animals/elephant.jpg",
		answer: "Elephant"
	},
	{
		question: "images/animals/fox.jpg",
		answer: "Fox"
	},
	{
		question: "images/animals/lion.jpg",
		answer: "Lion"
	},
	{
		question: "images/animals/meerkat.jpg",
		answer: "Meerkat"
	},
	{
		question: "images/animals/puppy.jpg",
		answer: "Puppy"
	},
	{
		question: "images/animals/squirrel.jpg",
		answer: "Squirrel"
	},
	{
		question: "images/animals/tiger.jpg",
		answer: "Tiger"
	},
	{
		question: "images/animals/wolf.jpg",
		answer: "Wolf"
	},
	{
		question: "images/animals/giraffe.jpg",
		answer: "Giraffe"
	},
	{
		question: "images/animals/gorilla.jpg",
		answer: "Gorilla"
	},
	{
		question: "images/animals/hippopotamus.jpg",
		answer: "Hippopotamus"
	},
	{
		question: "images/animals/horse.jpg",
		answer: "Horse"
	},
	{
		question: "images/animals/koala.jpg",
		answer: "Koala"
	},
	{
		question: "images/animals/moose.jpg",
		answer: "Moose"
	},
	{
		question: "images/animals/panda.jpg",
		answer: "Panda"
	},
	{
		question: "images/animals/rabbit.jpg",
		answer: "Rabbit"
	},
	{
		question: "images/animals/racoon.jpg",
		answer: "Racoon"
	},
	{
		question: "images/animals/rhinoceros.jpg",
		answer: "Rhinoceros"
	},
	{
		question: "images/animals/zebra.jpg",
		answer: "Zebra"
	}	
];

window.car_Logos = [
	{
		question: "images/car_logos/audi.jpg",
		answer: "Audi"
	},
	{
		question: "images/car_logos/bentley.jpg",
		answer: "Bentley"
	},
	{
		question: "images/car_logos/citroen.jpg",
		answer: "Citroen"
	},
	{
		question: "images/car_logos/ferrari.jpg",
		answer: "Ferrari"
	},
	{
		question: "images/car_logos/honda.jpg",
		answer: "Honda"
	},
	{
		question: "images/car_logos/infinity.jpg",
		answer: "Infinity"
	},
	{
		question: "images/car_logos/maserati.jpg",
		answer: "Maserati"
	},
	{
		question: "images/car_logos/mercedes.jpg",
		answer: "Mercedes"
	},
	{
		question: "images/car_logos/mitsubishi.jpg",
		answer: "Mitsubishi"
	},
	{
		question: "images/car_logos/peugeot.jpg",
		answer: "Peugeot"
	},
	{
		question: "images/car_logos/porsche.jpg",
		answer: "Porsche"
	},
	{
		question: "images/car_logos/skoda.jpg",
		answer: "Skoda"
	},
	{
		question: "images/car_logos/subaru.jpg",
		answer: "Subaru"
	},
	{
		question: "images/car_logos/tesla.jpg",
		answer: "Tesla"
	},
	{
		question: "images/car_logos/toyota.jpg",
		answer: "Toyota"
	},
	{
		question: "images/car_logos/cadillac.jpg",
		answer: "Cadillac"
	},
	{
		question: "images/car_logos/hyundai.jpg",
		answer: "Hyundai"
	},
	{
		question: "images/car_logos/jaguar.jpg",
		answer: "Jaguar"
	},
	{
		question: "images/car_logos/morrisGarages.jpg",
		answer: "Morris Garages"
	},
	{
		question: "images/car_logos/miniCooper.jpg",
		answer: "Mini Cooper"
	},
	{
		question: "images/car_logos/renault.jpg",
		answer: "Renault"
	},
	{
		question: "images/car_logos/rollsRoyce.jpg",
		answer: "Rolls Royce"
	}
];

window.tech_Logos = [
	{
		question: "images/tech_logos/android.jpg",
		answer: "Android"
	},
	{
		question: "images/tech_logos/apple.jpg",
		answer: "Apple"
	},
	{
		question: "images/tech_logos/amazon.jpg",
		answer: "Amazon"
	},
	{
		question: "images/tech_logos/linkedin.jpg",
		answer: "LinkedIn"
	},
	{
		question: "images/tech_logos/paypal.jpg",
		answer: "Paypal"
	},
	{
		question: "images/tech_logos/windows.jpg",
		answer: "Windows"
	},
	{
		question: "images/tech_logos/wordpress.jpg",
		answer: "Wordpress"
	},
	{
		question: "images/tech_logos/youtube.jpg",
		answer: "Youtube"
	},
	{
		question: "images/tech_logos/bitcoin.jpg",
		answer: "Bitcoin"
	},
	{
		question: "images/tech_logos/facebook.jpg",
		answer: "Facebook"
	},
	{
		question: "images/tech_logos/whatsapp.jpg",
		answer: "Whatsapp"
	},
	{
		question: "images/tech_logos/spotify.jpg",
		answer: "Spotify"
	},
	{
		question: "images/tech_logos/pinterest.jpg",
		answer: "Pinterest"
	},
	{
		question: "images/tech_logos/twitter.jpg",
		answer: "Twitter"
	},
	{
		question: "images/tech_logos/soundcloud.jpg",
		answer: "Sound Cloud"
	},
	{
		question: "images/tech_logos/instagram.jpg",
		answer: "Instagram"
	},
	{
		question: "images/tech_logos/snapchat.jpg",
		answer: "Snapchat"
	},
	{
		question: "images/tech_logos/flickr.jpg",
		answer: "Flickr"
	},
	{
		question: "images/tech_logos/google.jpg",
		answer: "Google"
	},
	{
		question: "images/tech_logos/skype.jpg",
		answer: "Skype"
	},
	{
		question: "images/tech_logos/tumblr.jpg",
		answer: "Tumblr"
	},
	{
		question: "images/tech_logos/vimeo.jpg",
		answer: "Vimeo"
	}
];

window.flags = [
	{
		question: "images/flags/argentina.jpg",
		answer: "Argentina"
	},
	{
		question: "images/flags/australia.jpg",
		answer: "Australia"
	},
	{
		question: "images/flags/belgium.jpg",
		answer: "Belgium"
	},
	{
		question: "images/flags/canada.jpg",
		answer: "Canada"
	},
	{
		question: "images/flags/china.jpg",
		answer: "China"
	},
	{
		question: "images/flags/usa.jpg",
		answer: "America"
	},
	{
		question: "images/flags/sweden.jpg",
		answer: "Sweden"
	},
	{
		question: "images/flags/norway.jpg",
		answer: "Norway"
	},
	{
		question: "images/flags/india.jpg",
		answer: "India"
	},
	{
		question: "images/flags/england.jpg",
		answer: "England"
	},
	{
		question: "images/flags/austria.jpg",
		answer: "Austria"
	},
	{
		question: "images/flags/ukraine.jpg",
		answer: "Ukraine"
	},
	{
		question: "images/flags/spain.jpg",
		answer: "Spain"
	},
	{
		question: "images/flags/mexico.jpg",
		answer: "Mexico"
	},
	{
		question: "images/flags/greece.jpg",
		answer: "Greece"
	},
	{
		question: "images/flags/colombia.jpg",
		answer: "Colombia"
	},
	{
		question: "images/flags/russia.jpg",
		answer: "Russia"
	},
	{
		question: "images/flags/japan.jpg",
		answer: "Japan"
	},
	{
		question: "images/flags/germany.jpg",
		answer: "Germany"
	},
	{
		question: "images/flags/poland.jpg",
		answer: "Poland"
	},
	{
		question: "images/flags/italy.jpg",
		answer: "Italy"
	},
	{
		question: "images/flags/france.jpg",
		answer: "France"
	}
];