/* JAC Group project
 * Coding Bootcamp May-Nov
 *
 * Created 6/8/2017
 * Last edited 6/8/2017
 */

function Player(playerEmail, playerName, playerEXP, playerMoney, playerBag, playerPokemon) {
    this.playerEmail = playerEmail;
    this.playerName = playerName;
    this.playerEXP = playerEXP;
    this.playerMoney = playerMoney;
    this.playerBag = playerBag;
    this.playerPokemon = playerPokemon; //pokemon[];
}

function Pokemon(pokemonName, pokemonImgLink, pokemonHP, pokemonEXP, pokemonSkill) {
    this.pokemonName = pokemonName;
    this.pokemonImgLink = pokemonImgLink;
    this.pokemonHP = pokemonHP;
    this.pokemonEXP = pokemonEXP;
    this.pokemonSkills = pokemonSkill;   //skills[];
}

function Skill(skillName, skillDMG) {
    this.skillName = skillName;
    this.skillDMG = skillDMG;
}

//EXAMPLE PLAYER
var exampleSkillList = [];
exampleSkillList.push(new Skill('Tackle', 5));

var examplePokemonList = [];
examplePokemonList.push(new Pokemon('Squirtle', 'https://cdn.bulbagarden.net/upload/3/39/007Squirtle.png', 100, 0, exampleSkillList));

var exampleBag = {
    potion: 10,
    superPotion: 0,
};

var examplePlayer = new Player('bagelxp@gmail.com', 'Bagel', 0, 1000, exampleBag, examplePokemonList);
console.log(examplePlayer);
