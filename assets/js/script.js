// JS TODO List: 
//  - need to save user input into local storage and render last three searches on page
//  - right side buttons: pokemon of the day, mysquad, user journal entry
//  - captialize abilities and types

// Global Variables 
let quoteSection = document.querySelector('#quote');
let main = document.querySelector('main');
let search = document.querySelector('#search')
let statPage = document.querySelector('#stat-page')
let norrisQuote = document.querySelector('#norris-quote')
let norrisBtn = document.querySelector('#norris-button')
let searchBtn = document.querySelector('#search-button');
let norrisBox = document.querySelector('#norris-container');
let body = document.querySelector('body');
let statContainer = document.querySelector('#stat-container');
let pokeInfo = document.querySelector('#stat-page');
let mySquadBtn = document.querySelector('#my-squad');
let historySection = document.querySelector('#search-history')


// We scraped data endpoint and reduced it to an array of names, pokeList.
// Use this to build auto-complete feature for when user is searching names.
console.log(pokeList);

// These functions are called so they are functional at page load.
renderSearchHistory();
renderMySquad();
// disableNoSearch();

// event listener for clicking search button
searchBtn.addEventListener('click', function replaceName(event) {
    event.preventDefault();
    let input = document.querySelector('input').value.toLowerCase();
    renderPokemon(input);
    renderSearchHistory();
    search.reset()
    norrisQuote.textContent = ''
});

// Pokemon API Section
function renderPokemon(name) {
    let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${name}`; //Pokemon API

    fetch(pokeUrl)
        .then(function (response) {

            if (!response.ok) {
                statPage.textContent = ''
                body.setAttribute('style', 'background-image: url(./assets/images/city-landscapeglitch.webp);')
                let errorMsg =
                    `Oak's words echoed... "There's a time and place for everything but not now!"`;
                // statPage.setHTML(errorMsg);
                document.querySelector('img').src = './assets/images/MissingNo.1.webp';
                norrisBox.setAttribute('style', 'display:flex');
                // document.querySelector('#norris-quote').textContent = 'That\'s not a Pokémon, LOL.';
                let errorLol = 'That\'s not a Pokémon, LOL.';
                let i = 0;
                function typeWriter() {
                    if (i < errorMsg.length) {
                        statPage.textContent += errorMsg.charAt(i);
                        norrisQuote.textContent += errorLol.charAt(i)
                        i++
                        setTimeout(typeWriter, 20);
                    };
                };
                typeWriter();
                return;
            } else {
                document.querySelector('#norris-quote').textContent = '';
                body.setAttribute('style', 'background-image: url(./assets/images/city-landscape.webp);')
                return response.json();
            }

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
            renderSearchHistory(); //adds search history button
            addMySquad(); // allows for double clicking to add to mySquad in local storage;


        });

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
            // gave pokemon name in first p tag a span id so we can access name for mySquad dblclick event
            `<div class="stat-element">
                <p><strong>NAME: </strong><span id = "squadName">${(data.name).charAt(0).toUpperCase() + (data.name).slice(1)}</span></p><br>
                <p><strong>HEIGHT: </strong>${(((data.height * 0.1) * 39.4) / 12).toFixed(1)} ft</p><br>
                <p><strong>WEIGHT: </strong>${((data.weight * 0.1) * 2.205).toFixed(1)} lbs</p><br>
               <p><strong>ABILITIES: </strong>${renderAbilities(data.abilities)} </p><br>
               <p><strong>TYPES: </strong><span id = "squadType">${renderTypes(data.types)}</span></p><br>
               <ul><strong>STATS: </strong>${renderBaseStat(data.stats)}</ul><br>
            </div>`
        statPage.setHTML(statCardHTML);
    }
};

// ===========================================
// SEARCH HISTORY BUTTONS
// Following code includes a function that generates user's last three Pokemon searches 
// and renders names on the left side buttons.

function renderSearchHistory() {
    //We access array with key of pokemon to retrieve the names of the last three Pokemon user searched.
    // If no searches have been made, we retrieve an empty array.

    let pkmnArr = JSON.parse(localStorage.getItem('pokemon')) || [];

    // This loop access the search-history id element then its direct children,
    // looping through each button and adding corresponding element indexed (pokemon names)
    // in the array as text.
    for (let i = 0; i < pkmnArr.length && i < 3; i++) {

        let history = document.querySelector('#search-history')
        history.children[i].textContent = pkmnArr[i].charAt(0).toUpperCase() + (pkmnArr[i]).slice(1);
        historySection.children[i].removeAttribute('disabled');
    }
}

// Event listener that listens for user's click on specific button in order to render
// corresponding Pokemon's information.

document.querySelector('#search-history').addEventListener('click', function (event) {
    if (event.target.matches('.button')) {
        let searchedPkmn = event.target.textContent.toLowerCase();

        // when the click goes through, we render pokemon info on stat-page.
        renderPokemon(searchedPkmn);
    }
});

// ===========================================
// mySquad feature
function addMySquad() {
    //this enables the cursor to switch to cell icon to indicate user can now add to team
    statContainer.setAttribute('style', 'cursor: cell');

    // I set a span id for the pokemon's name in statCard function so we can access whatever name is in stat-page
    let mySquadName = document.querySelector('#squadName')
    let mySquadType = document.querySelector('#squadType')
    console.log(mySquadName.textContent.toLowerCase());
    console.log(mySquadType.textContent);
    // Access array for mySquad
    let addSquadPkmn = JSON.parse(localStorage.getItem('mySquad')) || [];
    // console.log(addSquadPkmn[i]);

    // this is what the double click event triggers
    statContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();

        // Resolves the issue that doubleclick was registering name more than once by eliminating dupes.
        // if (addSquadPkmn.includes(mySquadName.textContent.toLowerCase())) {
        //     let index = addSquadPkmn.indexOf(mySquadName.textContent.toLowerCase());
        //     addSquadPkmn.splice(index, 1);
        // }
        // Add double-clicked pokemon to array, if team is full, removes first pokemon
        if (addSquadPkmn.length >= 6) {
            addSquadPkmn.shift();
        }
        addSquadPkmn.push((mySquadName.textContent.toLowerCase()) + ' - ' + mySquadType.textContent);
        localStorage.setItem('mySquad', JSON.stringify(addSquadPkmn));

    });
};

// this listens for a click event on the mySquad button on the right of page
function renderMySquad() {
    mySquadBtn.addEventListener('click', function (event) {
        event.preventDefault();

        let mySquadArr = JSON.parse(localStorage.getItem('mySquad')) || [];

        pokeInfo.innerHTML = '';
        console.log('this works');

        for (let i = 0; i < mySquadArr.length && i < 6; i++) {
            let squadList = document.createElement('ul');
            let squadMember = document.createElement('li');
            squadMember.classList.add('squad-mon');
            squadMember.setAttribute('style', 'margin-bottom: 1%');

            pokeInfo.appendChild(squadList);
            squadList.appendChild(squadMember);

            squadMember.textContent = mySquadArr[i].charAt(0).toUpperCase() + mySquadArr[i].slice(1);
        };

    });
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

            let pokeName = `${name}`;
            let cnQuote = data.value;
            let pkmnQuote = cnQuote.replaceAll(/chuck norris|chuck|norris/ig, pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1));
            let possessiveNorris = /chuck's|chuck norris'|chuck norris's|norris's/ig
            let pkmnPossessive = cnQuote.replaceAll(/chuck's|chuck norris'|chuck norris's|norris's/ig, pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1) + `'s`);

            let i = 0;

            if (cnQuote.match(possessiveNorris)) {
                norrisQuote.textContent = ''
                function typeWriter() {
                    if (i < pkmnPossessive.length) {
                        norrisQuote.textContent += pkmnPossessive.charAt(i);
                        i++
                        setTimeout(typeWriter, 20);
                    };
                };
                typeWriter();
            } else {
                norrisQuote.textContent = ''
                function typeWriter() {
                    if (i < pkmnQuote.length) {
                        norrisQuote.textContent += pkmnQuote.charAt(i);
                        i++
                        setTimeout(typeWriter, 20);
                    };
                };
                typeWriter();
            };
        });
};

// ========================================

// event listener for clicking search button
// let pastPkmn = document.querySelector('.search-button');

// pastPkmn.addEventListener('click', function addHistoryBtn(event) {
//     event.preventDefault();

//     let input = document.querySelector('input').value.toLowerCase();

//     renderPokemon(input);
// });

document.querySelector('#search-history').addEventListener('click', function (event) {
    if (event.target.matches('.button')) {
        console.log(event.target);
    }
});
function renderSearchHistory() {
    let pkmnArr = JSON.parse(localStorage.getItem('pokemon')) || [];



    for (let i = 0; i < pkmnArr.length && i < 3; i++) {
        let history = document.querySelector('#search-history')


        history.children[i].textContent = pkmnArr[i];
        // console.log(pkmnArr);
    }

};
