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
let pokeUrl = 'https://pokeapi.co/api/v2/pokemon/geodude'; //Pokemon API
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

        //DISPLAYING STAT CARD
        // need for loop for stats; it would display as such >> '${data.stats[i].stat.name : ${data.stats[i].base_stat}'
        // can replace abilities with stats or just add new category for stats.
        //just noticed height and weight are in decimeters and hectograms. must multiply by 0.10 to get kg units, multiply by 2.205 to pounds
        //multiply by 0.10 to get km, then multiply by 39.4 to get inches, then divide by 12 to get feet -- may need function for this conversion
        //write formula to write height in feet, weight in pounds
        // will need to write this in a for loop replacing index numbers with i.
        //just noticed for typing: code is broken if we include both types and pokemon only has one. need if statement to include second type

        let statCardHTML =
            `<div>
                <p class = "block"><strong>NAME:</strong> ${(data.name).charAt(0).toUpperCase() + (data.name).slice(1)}</p>
                <p class = "block"><strong>TYPE:</strong>  ${(data.types[0].type.name).charAt(0).toUpperCase() + (data.types[0].type.name).slice(1)}</p>
                <p class = "block"><strong>HEIGHT:</strong>  ${(((data.height * 0.1) * 39.4) / 12).toFixed(1)}'</p>
                <p class = "block"><strong>WEIGHT:</strong>  ${((data.weight * 0.1) * 2.205).toFixed(1)} lbs </p>
                <p class = "block"><strong>ABILITIES:</strong>  ${data.abilities[0].name} ${data.abilities[1].name}</p>
                <p class = "block"><strong>MAIN GAMES FOUND IN:</strong>  ${listOfGames.map(game => game.version.name).join(', ')}</p> 
    </div>`

        // <p>MAIN GAMES FOUND IN: ${listOfGames.map(game => game.version.name).join(', ')}</p> 
        //  this works and displays all the info. but i dont know what's happening. Not sure what .map is doing, where 'game' came from, and how arrow function works.

        document.querySelector('#stat-page').setHTML(statCardHTML);


        //DISPLAY IMAGE -- it's responsiveness on the page is weird, unsure why it's behaving how it is
        let image = document.querySelector('#pkmn-img');
        let imgUrl = data.sprites.front_default;
        image.setAttribute('src', imgUrl)

    })


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