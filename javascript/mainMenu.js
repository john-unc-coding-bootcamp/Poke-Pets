// moving to single file
var player;

database.ref("users").once("value", function(snapshot) {
    // Get correct user data from localstorage
    player = snapshot.val()[localStorage.getItem("id")];

	 // undefined works the same as null or false
	 // if player["pokemon"] is 'undefined' it won't
	 // trigger an if statement
	 // i.e.
	 //
	 // if (undefined) { 
	 //   console.log("print this"); 
	 // } else { 
	 //   console.log("print that"); 
	 // }
	 //
	 // will return -> print that
    if (player["pokemon"]) {
        drawPlayer(player);
        drawMenu();
    } else {
        $("#player").addClass("hidden");
        chooseStarter(player);
    }  
})

// If not, draw normal menu

function chooseStarter(player) {
    // Draw welcome text

    var text1 = $("<h2>Welcome to Pok&eacute;Pets, " + player["name"] + "</h2>"); 
    var text2 = $("<h2>To get started, choose your starter Pok&eacute;mon!</h2>")


    $("#content").append(text1, text2);

    // Make 3 Pokemon Divs
    var pokemon1 = $("<div id='pokemon1'></div>");
    pokemon1.addClass("pokemon-container");
    var pokemon2 = $("<div id='pokemon2'></div>");
    pokemon2.addClass("pokemon-container");
    var pokemon3 = $("<div id='pokemon3'></div>");
    pokemon3.addClass("pokemon-container");

    // Add Pokemon Names
    pokemon1.append("<h1 class='starterText'>Bulbasaur</h1>");
    pokemon2.append("<h1 class='starterText'>Charmander</h1>");
    pokemon3.append("<h1 class='starterText'>Squirtle</h1>");

    // Add Pokemon Images
    pokemon1.append("<img src='images/bulbasaur_lg.png' class='starterImage'>");
    pokemon2.append("<img src='images/charmander_lg.png' class='starterImage'>");
    pokemon3.append("<img src='images/squirtle_lg.png' class='starterImage'>");

		// Can DRY this up
    function clickPokemon(pokemon) {
      database.ref("users/" + localStorage.getItem("id")).update({
        pokemon: [pokemon]
      });
      $("#content").empty();
      drawPlayer(player);
      drawMenu();
    }

    bulbasaur = new Pokemon("Bulbasaur", "#", "#", "images/bulbasaur_lg.png", 60, 0, new Skill("Vine Whip", 5))
    charamander = new Pokemon("Charmander", "#", "#", "images/charmander_lg.png", 60, 0, new Skill("Ember", 5))
    squirtle = new Pokemon("Squirtle", "#", "#", "images/squirtle_lg.png", 60, 0, new Skill("Bubble", 5))
		
    // Add Click Events
    pokemon1.click(clickPokemon(bulbasaur));
    pokemon2.click(clickPokemon(charamander));
    pokemon3.click(clickPokemon(squirtle);
    
    // Append Pokemon Divs
    $("#content").append(pokemon1, pokemon2, pokemon3);
}

function drawPlayer(player) {
    
    // Show the div again
    $("#player").removeClass("hidden");

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
    var currentEXP = expToLevel(player["experience"]).exp;
    var totalEXP = expToLevel(player["experience"]).level * 2 + 7;
    expProgress.css("width", (currentEXP/totalEXP)*100 + "%");
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
    var myPokemon = $("<button class='button text-center'>");
    myPokemon.append($("<h1 class='buttonText'>My Pok&eacute;mon</h1>")) 
    var playAI = $("<button class='button text-center'>");
    playAI.append($("<h1 class='buttonText'>Battle</h1>")) 

    // Add Click Events
    myPokemon.click(function() {
        document.location.href = "myPokemon.html";
    });
    playAI.click(function() {
        document.location.href = "battleAI.html";
    });
    $("#content").css("background", "none");

    // Append Buttons
    $("#content").append(myPokemon, playAI);
}


