// JS TODO List: 
//  - find a way to display stats and list of games with the for loop.
//  - need to create functionality for search button (event listener that takes user input), randomize button
//  - need to save user input into local storage and render last three searches on page
//  - right side buttons: pokemon of the day, quiz, user journal entry
//  - captialize abilities and types

// Global Variables 
let quoteSection = document.querySelector('#quote');
let main = document.querySelector('main');
let searchBtn = document.querySelector('#search-button')
let norrisBox = document.querySelector('#norris-container')

// event listener for clicking search button
searchBtn.addEventListener('click', function replaceName(event) {
    event.preventDefault();

    let input = document.querySelector('input').value.toLowerCase();


    renderPokemon(input);
});

// Pokemon API Section
function renderPokemon(name) {
    let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${name}`; //Pokemon API

    //https://pokeapi.co/api/v2/pokemon/{name} will allow for user input to pass name in


    fetch(pokeUrl)
        .then(function (response) {
            // if (!response.ok) {
            //     alert('Please enter a Pokémon name.')
            //     return;
            // } could create modal instead of alert message
            return response.json();
        })
        .then(function (data) {
            statCard(data); // DISPLAY pokemon info
            pokemonImg(data); //DISPLAY IMAGE for current pokemon
            norrisBox.setAttribute('style', 'display:flex');
            norrisFact(name);
           
        })

    // Renders the Image for the current Pokemon
    function pokemonImg(data) {
        let image = document.querySelector('#pkmn-img');
        let imgUrl = data.sprites.front_default;
        image.setAttribute('src', imgUrl)
    }

    // Renders the abilities of the Pokemon
    function renderAbilities(abilitiesArr) {
        let HTML = '';
        for (let i = 0; i < abilitiesArr.length; i++) {
            HTML += `<span> ${abilitiesArr[i].ability.name}</span>`
        }
        return HTML;
    }

    // Renders the different types of the Pokemon
    function renderTypes(typesArr) {
        let HTML = '';
        for (let i = 0; i < typesArr.length; i++) {
            HTML += `<span> ${typesArr[i].type.name}</span>`
        }
        return HTML;
    }

    // Renders the base_stat and name for the Pokemon
    function renderBaseStat(baseStatArr) {
        let HTML = '';
        for (let i = 0; i < baseStatArr.length; i++) {
            HTML += `<li>${baseStatArr[i].stat.name}: ${baseStatArr[i].base_stat} </li>`
        }
        return HTML;
    }

    // Renders a dynamic stat card for a Pokemon 
    function statCard(data) {
        let statCardHTML = ''
        statCardHTML +=
            `<div class="stat-element">
                <p><strong>NAME:</strong> ${(data.name).charAt(0).toUpperCase() + (data.name).slice(1)}</p>
                <p><strong>HEIGHT:</strong> ${(((data.height * 0.1) * 39.4) / 12).toFixed(1)} ft</p>
                <p><strong>WEIGHT:</strong> ${((data.weight * 0.1) * 2.205).toFixed(1)} lbs</p>
               <p><strong>ABILITIES:</strong> ${renderAbilities(data.abilities)} </p>
               <p><strong>TYPES:</strong> ${renderTypes(data.types)}</p>
               <ul><strong>STATS:</strong> ${renderBaseStat(data.stats)}</ul>
            </div>`
        document.querySelector('#stat-page').setHTML(statCardHTML);
    }
};

 // ===========================================

// Chuck Norris API Section
function norrisFact(name) {

    const catUrl = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random'; // Chuck Norris API
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238',
            'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
        }
    };
    
    let apiKey = '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238';
    //never read anywhere, do we need it?
    
        fetch(catUrl, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
    
                console.log(data);
                // testing to see if we can replace chuck norris' name
                let pokeName = `${name}`;
                console.log(pokeName);
                let cnQuote = data.value;
                // let cnQuote = 'CHuck Norris is <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem blanditiis, perspiciatis minus aspernatur repellat. Nostrum aperiam accusamus sit blanditiis voluptatem aut magni dolorum. Odit voluptatum nobis sunt alias est.';
    
                let pkmnQuote = cnQuote.replaceAll(/Chuck Norris/ig, pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1));
                console.log(pkmnQuote);
                console.log(cnQuote);
                let pluralNorris = 'Chuck Norris\'';
                if (cnQuote.includes(pluralNorris)) {
                    cnQuote.replaceAll('Chuck Norris\'', pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1) + `'s`);
                } else {
                    document.querySelector('#norris-quote').textContent = pkmnQuote;
                }
            })
    };
    
    //only problem is if chuck norris' name is used in possessive because of how apostrophe works.
    //need if statement to achieve this.