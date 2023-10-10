// Global Variables 
let main = document.querySelector('main');
let body = document.querySelector('body');
let search = document.querySelector('#search');
let searchBtn = document.querySelector('#search-button');
let historySection = document.querySelector('#search-history');
let ranBtn = document.querySelector('#random-button');
let ranClick = localStorage.getItem('ranClick') || 0;
let isAnimateActive = false;
//pokemon global variables
let statContainer = document.querySelector('#stat-container');
let pokeInfo = document.querySelector('#stat-page');
let mySquadBtn = document.querySelector('#my-squad');
let image = document.querySelector('#pkmn-img');
let pokeJournalBtn = document.querySelector('#poke-journal');
let pod = document.querySelector('#pod');
let recommendations = document.querySelector('#poke-recommendations');
// Chuck Norris Global variables
let norrisBtn = document.querySelector('#norris-button')
let norrisQuote = document.querySelector('#norris-quote');
let norrisBox = document.querySelector('#norris-container');
//Noticed GitHub views getRandomCategory as function; leaving it in variables bc it is a func put into a variable that gets passed into API endpoint.
const getRandomCategory = () => ['animal', 'career', 'celebrity', 'dev', 'fashion', 'food', 'history', 'money', 'movie', 'music', 'science', 'sport', 'travel'][Math.floor(Math.random() * 13)];

// All called on page load
autoComplete();
renderSearchHistory();
renderMySquad();
pokemon_of_the_day();
renderJournal();

// POKEMON FUNCTIONS

// Renders all the Pokemon info
function renderPokemon(name) {
    let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;

    fetch(pokeUrl)
        .then(function (response) {
            // If statement to render glitch feature
            if (!response.ok || name === '') {
                body.setAttribute('style', 'background-image: url(./assets/images/city-landscapeglitch.webp);');
                document.querySelector('img').src = './assets/images/MissingNo.1.webp';
                norrisBox.setAttribute('style', 'display:flex');
                pokeInfo.textContent = `Oak's words echoed... "There's a time and place for everything but not now!"`;
                norrisQuote.textContent = 'That\'s not a Pokémon, LOL.';
                return;
            } else {
                body.setAttribute('style', 'background-image: url(./assets/images/city-landscape.webp);')
                return response.json();
            }
        })
        .then(function (data) {
            let pkmnArr = JSON.parse(localStorage.getItem('pokemon')) || [];

            // Removes duplicates in array & search history buttons; organizes array in local storage
            if (pkmnArr.includes(data.name)) {
                let index = pkmnArr.indexOf(data.name);
                pkmnArr.splice(index, 1);
            }
            pkmnArr.unshift(data.name);
            localStorage.setItem('pokemon', JSON.stringify(pkmnArr));

            // These ultimately are called/happen if user search goes well
            statCard(data);
            pokemonImg(data);
            norrisBox.setAttribute('style', 'display:flex');
            norrisFact(name);
            renderSearchHistory();
            addMySquad();
        });
}

// Renders Pokemon image
function pokemonImg(data) {
    let imgUrl = data.sprites.front_default;
    // API doesn't have images for some newer Pokemon; put in a generic Pokeball image for those
    if (imgUrl === null) {
        imgUrl = './assets/images/nullpokeball.png';
    }
    image.setAttribute('src', imgUrl)
}

// Renders the abilities line in stat-page
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
        HTML += `<span> ${typesArr[i].type.name.charAt(0).toUpperCase() + typesArr[i].type.name.slice(1)}</span>`;
        if (i < typesArr.length - 1) {
            HTML += ' /';
        }
    }
    return HTML;
}
// Renders the actual stats of Pokemon (HP, ATK, DEF, SPATK, SPDEF, Speed)
function renderBaseStat(baseStatArr) {
    let HTML = '';
    for (let i = 0; i < baseStatArr.length; i++) {
        HTML += `<li>${baseStatArr[i].stat.name.toUpperCase()}: ${baseStatArr[i].base_stat} </li>`
    }
    return HTML;
}

// Displays the full page for the Pokemon; 
// methods and calculations done to capitalize first letter of names and convert API measurements to feet and pounds, respectively.
function statCard(data) {
    let statCardHTML = ''
    statCardHTML +=
        `<div class="stat-element">
                <p class= "statline"><strong>NAME: </strong><span id = "squadName">${(data.name).charAt(0).toUpperCase() + (data.name).slice(1)}</span></p>
                <p class= "statline"><strong>HEIGHT: </strong>${(((data.height * 0.1) * 39.4) / 12).toFixed(1)} ft</p>
                <p class= "statline"><strong>WEIGHT: </strong>${((data.weight * 0.1) * 2.205).toFixed(1)} lbs</p>
               <p class= "statline"><strong>ABILITIES: </strong>${renderAbilities(data.abilities)} </p>
               <p class= "statline"><strong>TYPES: </strong><span id = "squadType">${renderTypes(data.types)}</span></p>
               <ul id= "poke-stats"><strong>STATS: </strong>${renderBaseStat(data.stats)}</ul><br>
            </div>`
    pokeInfo.innerHTML = statCardHTML;
};

// Logic for saving a Pokemon into local storage for just today; tomorrow will be a new Pokemon.
// Event listener will render this info onto page.
function pokemon_of_the_day() {
    const today = dayjs().format('MM/DD/YYYY');
    let pokemon = localStorage.getItem(today);
    if (pokemon) {
        pokemon = JSON.parse(pokemon);
    } else {
        pokemon = null;
    }
    if (pokemon === null) {
        // Accesses name from pokeList.js via random index.
        let pod = pokeList[Math.floor(Math.random() * pokeList.length)].name;
        localStorage.setItem(today, JSON.stringify(pod));
    } else {

    }
}

// Renders the names of user's last three searches into the corresponding search history buttons on left of page.
function renderSearchHistory() {
    let pkmnArr = JSON.parse(localStorage.getItem('pokemon')) || [];

    // For loop limits array and text content for buttons to three Pokemon names.
    for (let i = 0; i < pkmnArr.length && i < 3; i++) {
        historySection.children[i].textContent = pkmnArr[i].charAt(0).toUpperCase() + pkmnArr[i].slice(1);
        // Search history buttons with no searches/names rendered are initially disabled; become enabled when search occurs.
        historySection.children[i].removeAttribute('disabled');
    }
}

// Mini-game to add Pokemon to MySquad
function addMySquad() {
    // sets cursor to a + button to indicate to click the image to catch Pokemon.
    image.setAttribute('style', 'cursor: cell');

    let mySquadName = document.querySelector('#squadName');
    let mySquadType = document.querySelector('#squadType');
    let addSquadPkmn = JSON.parse(localStorage.getItem('mySquad')) || [];

    // double-click event to add Pokemon
    image.addEventListener('dblclick', function (event) {
        event.preventDefault();

        let caught = `You caught a wild ${mySquadName.textContent}!\n
        ${mySquadName.textContent} was added to your MySquad.`;
        let fled = `Darn! The wild ${mySquadName.textContent} broke out of the Pokéball!\n
        ${mySquadName.textContent} ran away.`;

        let outcome = [caught, fled];
        let outcomeIndex = (Math.floor(Math.random() * outcome.length));
        let result = outcome[outcomeIndex];

        pokeInfo.textContent = result;
        if (result === caught) {
            // Limits team to 6 like in the actual Pokemon series
            if (addSquadPkmn.length >= 6) {
                addSquadPkmn.shift();
            }
            addSquadPkmn.push(mySquadName.textContent.toLowerCase() + ' - ' + mySquadType.textContent);
            localStorage.setItem('mySquad', JSON.stringify(addSquadPkmn));
        }
    });
}

// On click, renders team to stat-page
function renderMySquad() {
    mySquadBtn.addEventListener('click', function (event) {
        event.preventDefault();

        let mySquadArr = JSON.parse(localStorage.getItem('mySquad')) || [];

        // If no Pokemon are added yet, instructions on how to catch are displayed,
        // otherwise, team will render on stat-page.
        if (mySquadArr.length < 1) {
            pokeInfo.textContent = 'Double-click on a Pokémon itself in order to catch and add it to your MySquad!'
        } else {
            pokeInfo.innerHTML = '';

            for (let i = 0; i < mySquadArr.length && i < 6; i++) {

                let squadList = document.createElement('ul');
                squadList.classList.add('squad-card');

                let squadMember = document.createElement('li');
                squadMember.classList.add('squad-mon');
                squadMember.setAttribute('style', 'margin-bottom: 1%');

                pokeInfo.appendChild(squadList);
                squadList.appendChild(squadMember);
                squadMember.textContent = mySquadArr[i].charAt(0).toUpperCase() + mySquadArr[i].slice(1);

                // Can click on squad member to render their information
                squadMember.addEventListener('click', function (event) {
                    event.preventDefault();

                    let listedPkmn = squadMember.textContent;
                    listedPkmn = listedPkmn.split(' -');
                    listedPkmn = listedPkmn[0].toLowerCase();
                    renderPokemon(listedPkmn);
                })
            };
        }
    });
};

// Renders journal for user to type notes
function renderJournal() {
    pokeJournalBtn.addEventListener('click', function (event) {
        event.preventDefault();

        pokeInfo.textContent = '';

        let textarea = document.createElement('textarea');
        textarea.setAttribute('rows', '28');
        textarea.setAttribute('cols', '50');
        textarea.setAttribute('placeholder', 'Type notes here...');
        pokeInfo.appendChild(textarea);

        let pokeJournal = localStorage.getItem('pokeJournal') || '';

        textarea.textContent = pokeJournal;

        // Autosaves what user types!
        textarea.addEventListener('keyup', function () {
            localStorage.setItem('pokeJournal', textarea.value);
        });
    });
}

// Dropdown of autocomplete/recommendations of Pokemon names in search bar
function autoComplete() {
    for (let i = 0; i < pokeList.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', pokeList[i].name.charAt(0).toUpperCase() + pokeList[i].name.slice(1));
        recommendations.appendChild(option);
    }
};

// CHUCK NORRIS FUNCTION - renders Norris Fact to page
function norrisFact(name) {
    let catUrl = `https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random?category=${getRandomCategory()}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238',
            'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
        },
    };
    fetch(catUrl, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let pokeName = `${name}`;
            let cnQuote = data.value;

            // Replaces Chuck Norris' name with Pokemon names
            let pkmnQuote = cnQuote.replaceAll(/chuck norris|chuck|norris/ig, pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1));

            // Checks and replaces all possessive instances with Norris' name
            let possessiveNorris = /chuck's|chuck norris's|chuck norris'|norris's|norris'/ig
            let pkmnPossessive = cnQuote.replaceAll(/chuck's|chuck norris's|chuck norris'|norris's|norris'/ig, pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1) + `'s`);
            if (cnQuote.match(possessiveNorris)) {
                norrisQuote.textContent = pkmnPossessive
            } else {
                norrisQuote.textContent = pkmnQuote
            };
        });
};

// EVENT LISTENERS

//Listens for click on search button at top; renders Pokemon
searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    let input = document.querySelector('input').value.toLowerCase();
    renderPokemon(input);
    // Clears the search bar once search is made
    search.reset();
});

// Listens for click on randomize button at top of page
ranBtn.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.setItem('ranClick', ranClick++);
    // Easter egg to display Chuck Norris on 50th click
    if (ranClick === 50) {
        pokeInfo.innerHTML = 'Chuck Norris email address is Gmail@chucknorris.com';
        image.src = './assets/images/chuckNorris.jpeg';
        norrisQuote.innerHTML = 'Chuck Norris proved that we are alone in the universe. We weren\'t before his first space expedition';
    } else {
        let random = pokeList[Math.floor(Math.random() * pokeList.length)].name;
        renderPokemon(random);
    }
});

//Listens for click on search history buttons at the left of page; renders Pokemon
historySection.addEventListener('click', function (event) {
    if (event.target.matches('.button')) {
        let searchedPkmn = event.target.textContent.toLowerCase();
        renderPokemon(searchedPkmn);
    }
});

//Listens for click on Pokemon of the Day button; renders Pokemon from pokemon_of_the_day function
pod.addEventListener('click', function () {
    const today = dayjs().format('MM/DD/YYYY');
    let pokemon = JSON.parse(localStorage.getItem(today)) || '';
    renderPokemon(pokemon);
});