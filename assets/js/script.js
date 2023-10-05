// JS TODO List: 
//  - need to save user input into local storage and render last three searches on page
//  - right side buttons: pokemon of the day, mysquad, user journal entry
//  - captialize abilities and types

// Global Variables 
let quoteSection = document.querySelector('#quote');
let main = document.querySelector('main');
let searchBtn = document.querySelector('#search-button')
let norrisBox = document.querySelector('#norris-container')
let body = document.querySelector('body');

console.log(pokeList);

renderSearchHistory();

// event listener for clicking search button
searchBtn.addEventListener('click', function replaceName(event) {
    event.preventDefault();

    let input = document.querySelector('input').value.toLowerCase();

    renderPokemon(input);
});

// Pokemon API Section
function renderPokemon(name) {
    let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${name}`; //Pokemon API

    fetch(pokeUrl)
        .then(function (response) {

            if (!response.ok) {
                body.setAttribute('style', 'background-image: url(./assets/images/city-landscapeglitch.webp);')
                let errorMsg =
                    `<p>Oak's words echoed... "There's a time and place for everything but not now!"</p>`;
                document.querySelector('#stat-page').innerHTML = errorMsg;
                document.querySelector('img').src = './assets/images/MissingNo.1.webp';
                norrisBox.setAttribute('style', 'display:flex');
                document.querySelector('#norris-quote').textContent = 'That\'s not a Pokémon, LOL.';
                return;
            }
            document.querySelector('#norris-quote').textContent = '';
            body.setAttribute('style', 'background-image: url(./assets/images/city-landscape.webp);')
            // body.setAttribute('style', 'background-position: 25% 75%;')
            return response.json();

        })
        .then(function (data) {

            console.log(data);

            // using localStorage to save user's searches
            let pkmnArr = JSON.parse(localStorage.getItem('pokemon')) || [];

            if (pkmnArr.includes(data.name)) {
                let index = pkmnArr.indexOf(data.name);
                pkmnArr.splice(index, 1);
            }
            pkmnArr.unshift(data.name);
            localStorage.setItem('pokemon', JSON.stringify(pkmnArr));



            //all the actions that happen once we get data

            statCard(data); // DISPLAY pokemon info
            pokemonImg(data); //DISPLAY IMAGE for current pokemon
            norrisBox.setAttribute('style', 'display:flex');//removes norris box from hiding
            norrisFact(name);//displays norris-pokemon fact

            renderSearchHistory();

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
            HTML += `<span> ${abilitiesArr[i].ability.name.charAt(0).toUpperCase() + (abilitiesArr[i].ability.name).slice(1)}</span>`
            if (i < abilitiesArr.length - 1) {
                HTML += ' /';
              }
        }
        return HTML;
    }

    // Renders the different types of the Pokemon
    function renderTypes(typesArr) {
        let HTML = '';
        for (let i = 0; i < typesArr.length; i++) {
            HTML += `<span> ${typesArr[i].type.name.charAt(0).toUpperCase() + (typesArr[i].type.name).slice(1)}</span>`
            // credit to AI Xpert
            if (i < typesArr.length - 1) {
                HTML += ' /';
              }
              console.log(typesArr[0].type.name.charAt(0).toUpperCase() + (typesArr[0].type.name).slice(1))
        }
        return HTML;
    }

    // Renders the base_stat and name for the Pokemon
    function renderBaseStat(baseStatArr) {
        let HTML = '';
        for (let i = 0; i < baseStatArr.length; i++) {
            HTML += `<li>${baseStatArr[i].stat.name.toUpperCase()}: ${baseStatArr[i].base_stat} </li>`
        }
        return HTML;
    }

    // Renders a dynamic stat card for a Pokemon 
    function statCard(data) {
        let statCardHTML = ''
        statCardHTML +=
            `<div class="stat-element">
                <p><strong>NAME:</strong> ${(data.name).charAt(0).toUpperCase() + (data.name).slice(1)}</p><br>
                <p><strong>HEIGHT:</strong> ${(((data.height * 0.1) * 39.4) / 12).toFixed(1)} ft</p><br>
                <p><strong>WEIGHT:</strong> ${((data.weight * 0.1) * 2.205).toFixed(1)} lbs</p><br>
               <p><strong>ABILITIES:</strong> ${renderAbilities(data.abilities)} </p><br>
               <p><strong>TYPES:</strong> ${renderTypes(data.types)}</p><br>
               <ul><strong>STATS:</strong> ${renderBaseStat(data.stats)}</ul><br>
            </div>`
        document.querySelector('#stat-page').innerHTML=statCardHTML;
    }
};

// ===========================================

// Chuck Norris API Section
const getRandomCategory = () => ['animal', 'career', 'celebrity', 'dev', 'fashion', 'food', 'history', 'money', 'movie', 'music', 'science', 'sport', 'travel'][Math.floor(Math.random() * 13)];

function norrisFact(name) {

    let catUrl = `https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random?category=${getRandomCategory()}`; // Chuck Norris API
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238',
            'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
        }
    };
    fetch(catUrl, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let pokeName = `${name}`;
            console.log(pokeName);
            let cnQuote = data.value;
            let pkmnQuote = cnQuote.replaceAll(/Chuck Norris/ig, pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1));
            let pluralNorris = 'Chuck Norris\'';
            if (cnQuote.includes(pluralNorris)) {
                cnQuote.replaceAll('Chuck Norris\'', pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1) + `'s`);
            } else {
                document.querySelector('#norris-quote').innerHTML = `<p style = "font-size: 4vh">Did you know?</p> <br> ${pkmnQuote}`;
            }
        })
};

// ========================================
// event listener for clicking search button
// let pastPkmn = document.querySelector('.search-button');

// pastPkmn.addEventListener('click', function addHistoryBtn(event) {
//     event.preventDefault();

//     let input = document.querySelector('input').value.toLowerCase();

//     renderPokemon(input);
// });

function renderSearchHistory() {
    let pkmnArr = JSON.parse(localStorage.getItem('pokemon')) || [];



    for (let i = 0; i < pkmnArr.length && i < 3; i++) {
        let history = document.querySelector('#search-history')

        history.children[i].textContent = pkmnArr[i].charAt(0).toUpperCase() + (pkmnArr[i]).slice(1);

    }

}

document.querySelector('#search-history').addEventListener('click', function (event) { 
    if (event.target.matches('.button')) {
        // console.log(event.target.textContent);
        let searchedPkmn = event.target.textContent.toLowerCase();
        // console.log(searchedPkmn);
        renderPokemon(searchedPkmn);
     }
});

