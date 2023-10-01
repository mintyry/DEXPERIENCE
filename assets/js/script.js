// JS TODO List: 
//  - find a way to display stats and list of games with the for loop.
//  - need to create functionality for search button (event listener that takes user input), randomize button
//  - need to save user input into local storage and render last three searches on page
//  - right side buttons: pokemon of the day, quiz, user journal entry

// Global Variables 
const catUrl = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random'; // Chuck Norris API
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'X-RapidAPI-Key': '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238',
        'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
    }
};

//var apiKey =  '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238';


// let quoteSection = document.querySelector('#quote');
// let main = document.querySelector('main');


// Chuck Norris API Section

// fetch(catUrl, options)
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//     document.querySelector('#quote').innerHTML = data.value
//     console.log(data);

//testing to see if we can replace chuck norris' name
// let cnQuote = data.value;
// console.log(cnQuote);
// let pkmnQuote = cnQuote.replaceAll('Chuck Norris', 'Bulbasaur');
// console.log(pkmnQuote);

//only problem is if chuck norris' name is used in possessive because of how apostrophe works.
//need if statement to achieve this.

// ===========================================

// Pokemon API Section
let pokeUrl = 'https://pokeapi.co/api/v2/pokemon/bulbasaur'; //Pokemon API
const stat = document.querySelector('#stat-container');

//this endpoint simply lists all pokemon
//https://pokeapi.co/api/v2/pokemon/{name} would pull up details on that specific pokemon
//would need function to pass in the name of particular pokemon from user's input


fetch(pokeUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // pokeStat(data);
        console.log(data);
        console.log(data.stats[0].stat.name)
        console.log(data.stats[0].base_stat)

        //declared this for a more accessible scope so it can be used in function and when displaying content
        let listOfGames = data.game_indices;

        // this function logs every game the pokemon is in; dont know how to display all those names in setHTML; i'm used to doing textContent -Ryan
        function gamesList() {

            console.log(listOfGames);

            for (let i = 0; i < listOfGames.length; i++) {
                console.log(listOfGames[i].version.name);
            };
        }

        // need for loop for stats; it would display as such >> '${data.stats[i].stat.name : ${data.stats[i].base_stat}'
        // can replace abilities with stats or just add new category for stats.

        let statCardHTML =
            `<div>
                <p>NAME: ${data.name}</p>
                <p>TYPE: ${data.types[0].type.name} ${data.types[1].type.name}</p>
                <p>HEIGHT: ${data.height}</p>
                <p>WEIGHT: ${data.weight}</p>
                <p>ABILITIES: ${data.abilities[0].name} ${data.abilities[1].name}</p>
                <p>MAIN GAMES FOUND IN: </p>
    </div>`

        // <p>MAIN GAMES FOUND IN: ${listOfGames.map(game => game.version.name).join(', ')}</p> 
        //  this works and displays all the info. but i dont know what's happening. Not sure what .map is doing, where 'game' came from, and how arrow function works.

        document.querySelector('#stat-page').setHTML(statCardHTML);
    })
//


// function pokeStat(data) {

// }
// pokeStat();
// Note's for pokemon api section
// POKEMON FETCH
// so if using pokemon name with chuck norris fact, take user's input as name and .replace chuck norris

// getPokemonName();

// function getPokemonName() {
//     let inputBox = document.createElement('input');
//     main.append(inputBox);
//     let submitBtn = document.createElement('button');
// };