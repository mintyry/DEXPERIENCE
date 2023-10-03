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

var apiKey =  '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238';


let quoteSection = document.querySelector('#quote');
let main = document.querySelector('main');
let searchBtn = document.querySelector('#search-button')

// Chuck Norris API Section
searchBtn.addEventListener('click',
    function replaceName(event) {
        event.preventDefault();

        fetch(catUrl, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                console.log(data);
                // testing to see if we can replace chuck norris' name
                let pokeName = document.querySelector('#search-bar')
                let cnQuote = data.value;
                // let cnQuote = 'CHuck Norris is <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.';

                let pkmnQuote = cnQuote.replaceAll(/Chuck Norris/ig, pokeName.value.trim().charAt(0).toUpperCase() + (pokeName.value).slice(1));
                console.log(pkmnQuote);
                console.log(cnQuote);
                let pluralNorris = 'Chuck Norris\'';
                if (cnQuote.includes(pluralNorris)) {
                    cnQuote.replaceAll('Chuck Norris\'', pokeName.value.trim().charAt(0).toUpperCase() + (pokeName.value).slice(1) + `'s`);
                } else {
                    document.querySelector('#norris-quote').textContent = pkmnQuote;
                }
            })
    });

//only problem is if chuck norris' name is used in possessive because of how apostrophe works.
//need if statement to achieve this.

// ===========================================

// Pokemon API Section
let pokeUrl = 'https://pokeapi.co/api/v2/pokemon/geodude'; //Pokemon API
const stat = document.querySelector('#stat-container');

//https://pokeapi.co/api/v2/pokemon/{name} will allow for user input to pass name in

fetch(pokeUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        pokemonImg(data); //DISPLAY IMAGE for current pokemon
        statCard(data);
    })

// Renders the Image for the current Pokemon
function pokemonImg(data) {
    let image = document.querySelector('#pkmn-img');
    let imgUrl = data.sprites.front_default;
    image.setAttribute('src', imgUrl)
}

// Renders the abilities of the Pokemon
function renderAbilities(abilitiesArr) {
    let HTML = 'Abilities: ';
    for (let i = 0; i < abilitiesArr.length; i++) {
        HTML += `<span> ${abilitiesArr[i].ability.name}</span>`
    }
    return HTML;
}

// Renders the different types of the Pokemon
function renderTypes(typesArr) {
    let HTML = 'Type: ';
    for (let i = 0; i < typesArr.length; i++) {
        HTML += `<span> ${typesArr[i].type.name}</span>`
    }
    return HTML;
}

// Renders the base_stat and name for the Pokemon
function renderBaseStat(baseStatArr) {
    let HTML = 'Stats: ';
    for (let i = 0; i < baseStatArr.length; i++){
        HTML += `<li>${baseStatArr[i].stat.name}: ${baseStatArr[i].base_stat} </li>`
    }
    return HTML;
}

// Renders a dynamic stat card for a Pokemon 
function statCard(data) {
    let statCardHTML = ''
    statCardHTML +=
            `<div class="stat-element">
                <p>Name: ${(data.name).charAt(0).toUpperCase() + (data.name).slice(1)}</p>
                <p>Height: ${(((data.height * 0.1) * 39.4) / 12).toFixed(1)} ft</p>
                <p>Weight: ${((data.weight * 0.1) * 2.205).toFixed(1)} lbs</p>
               <p>${renderAbilities(data.abilities)} </p>
               <p>${renderTypes(data.types)}</p>
               <ul>${renderBaseStat(data.stats)}</ul>
            </div>`
    document.querySelector('#stat-page').setHTML(statCardHTML);
}

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