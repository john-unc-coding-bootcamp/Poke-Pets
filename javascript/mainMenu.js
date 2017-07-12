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

    if (player["pokemon"] === undefined) {
        chooseStarter(player["name"]);
    } else {
        drawPlayer(player);
        drawMenu();
    }  
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
            pokemon: [new Pokemon("Bulbasaur", "#", "#", "images/bulbasaur_lg.png", 60, 0, new Skill("Vine Whip", 5))]
        });
        $("#content").empty();
        drawMenu();
    });
    pokemon2.click(function() {
        database.ref("users/" + localStorage.getItem("id")).update({
            pokemon: [new Pokemon("Charmander", "#", "#", "images/charmander_lg.png", 60, 0, new Skill("Ember", 5))]
        });
        $("#content").empty();
        drawMenu();
    });
    pokemon3.click(function() {
        database.ref("users/" + localStorage.getItem("id")).update({
            pokemon: [new Pokemon("Squirtle", "#", "#", "images/squirtle_lg.png", 60, 0, new Skill("Bubble", 5))]
        });
        $("#content").empty();
        drawMenu();
    });
    
    // Append Pokemon Divs
    $("#content").append(pokemon1, pokemon2, pokemon3);
}

function drawPlayer(player) {
    
    // Make Player Image
    var playerImageDiv = $("<div id='playerImageDiv'>");
    var img = $("<img id='playerImage'>");
    img.attr("src", player["profilePic"]);
    playerImageDiv.append(img);
    $("#player").append(playerImageDiv);

    // Make Player Level
    var playerLevel = $("<h1 id='playerLevel' class='text-center'>Test</h1>");
    playerLevel.text(expToLevel(player["experience"]).level);
    playerImageDiv.append(playerLevel);

    // Make EXP Bar and Name Storage
    var leftContainer = $("<div id='leftContainer'>");
    $("#player").append(leftContainer);

    // Make Player EXP Bar
    var expBar = $("<div id='expBar'>");
    var expProgress = $("<div id='expProgress'>");
    expProgress.css("width", expToLevel(player["experience"]).exp + "%");
    expBar.append(expProgress);
    $("#leftContainer").append(expBar);

    // Make Name
    var playerName = $("<h1 id='playerName'>");
    playerName.text(player["name"]);
    $("#leftContainer").append(playerName);

    // Make Currency
    var playerMoney = $("<h1 id='playerMoney'>");
    playerMoney.text("$" + player["pokedollar"]);
    $("#leftContainer").append(playerMoney);
}

function drawMenu() {
    // Add Menu Buttons
    var myPokemon = $("<button class='button'>");
    myPokemon.append($("<h1 class='buttonText'>My Pokemon</h1>")) 
    var playAI = $("<button class='button'>");
    playAI.append($("<h1 class='buttonText'>Play AI</h1>")) 

    // Add Click Events
    myPokemon.click(function() {
        document.location.href = "myPokemon.html";
    });
    playAI.click(function() {
        document.location.href = "battleAI.html";
    });

    // Append Buttons
    $("#content").append(myPokemon, playAI);
}


