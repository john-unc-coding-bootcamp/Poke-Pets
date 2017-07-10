// Initialize Firebase
var config = {
    apiKey: "AIzaSyCzrx1SkMDyNlE4X2gOadgtPf8asSAWh70",
    authDomain: "poke-pets.firebaseapp.com",
    databaseURL: "https://poke-pets.firebaseio.com",
    projectId: "poke-pets",
    storageBucket: "poke-pets.appspot.com",
    messagingSenderId: "416846931"
};

firebase.initializeApp(config);
// Link to database
var database = firebase.database();

$(document).ready(function() {
	// var player = JSON.parse(JSON.stringify(examplePlayer1));  //example player
	var player = database.ref("users/ " + localStorage.getItem("id"));
	
	console.log(player);

	for (var i = 0; i<player.Pokemon.length; i++) {
		var current = player.Pokemon[i];

		var pokemonDiv = $("<div>").addClass("pokemon").attr("id", current.Name);
		var container = $("<div>").addClass("col-xs-4 img-container");
		var img = $("<img>").addClass("pokemon-img").attr("src", current.ImgLink);
		var lvl = $("<div>").addClass("pokemon-lvl text-center").html("<h4>XP: " + current.EXP + "</h4>");
		var stats = $("<div>").addClass("pokemon-stats col-xs-8").html("<h6>?</h6><h4>" + current.Name + "</h4>");

		container.html(img).append(lvl);
		pokemonDiv.html($("<div>").addClass("row").append(container).append(stats));


		$("#my-pokemon").append(pokemonDiv);
	}
});