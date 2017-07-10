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
var player;

database.ref("users").once("value", function(snapshot) {
    // Get correct user data from localstorage
    player = snapshot.val()[localStorage.getItem("id")];

    console.log(player["pokemon"] === undefined);

    // Display player info
    chooseStarter(player["name"]);
})

// If not, draw normal menu

function chooseStarter(name) {
    // Draw welcome text
    var text1 = $("<h2>Welcome to PokéPets, " + name + "</h2>"); 
    var text2 = $("<h2>To get started, choose your starter Pokemon!</h2>")
    $("#content").append(text1, text2);

    // Make 3 Pokemon Divs
    var pokemon1 = $("<div id='pokemon1'></div>");
    pokemon1.addClass("col-sm-4");
    var pokemon2 = $("<div id='pokemon2'></div>");
    pokemon2.addClass("col-sm-4");
    var pokemon3 = $("<div id='pokemon3'></div>");
    pokemon3.addClass("col-sm-4");

    // Add Pokemon Names
    pokemon1.append("<h1 class='starterText'>Bulbasaur</h1>");
    pokemon2.append("<h1 class='starterText'>Charmander</h1>");
    pokemon3.append("<h1 class='starterText'>Squirtle</h1>");

    // Add Pokemon Images
    pokemon1.append("<img src='images/bulbasaur_lg.png' class='starterImage'>");
    pokemon2.append("<img src='images/charmander_lg.png' class='starterImage'>");
    pokemon3.append("<img src='images/squirtle_lg.png' class='starterImage'>");

    // Add Click Events
    pokemon1.click(function() {
        database.ref("users/" + localStorage.getItem("id")).update({
            pokemon: [new Pokemon("Bulbasaur", "#", "#", 60, 0, new Skill("Vine Whip", 5))]
        });
    });
    pokemon2.click(function() {
        database.ref("users/" + localStorage.getItem("id")).update({
            pokemon: [new Pokemon("Charmander", "#", "#", 60, 0, new Skill("Ember", 5))]
        });
    });
    pokemon3.click(function() {
        database.ref("users/" + localStorage.getItem("id")).update({
            pokemon: [new Pokemon("Squirtle", "#", "#", 60, 0, new Skill("Bubble", 5))]
        });
    });
    

    // Append Pokemon Divs
    $("#content").append(pokemon1, pokemon2, pokemon3);
}


