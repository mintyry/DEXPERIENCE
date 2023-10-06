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

// added variable for readability
let search = document.querySelector('#search')
let norrisQuote = document.querySelector('#norris-quote')
let norrisBtn = document.querySelector('#norris-button')

// console.log(pokeList);

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
                body.setAttribute('style', 'background-image: url(./assets/images/city-landscapeglitch.webp);')
                let errorMsg =
                    `<p>Oak's words echoed... "There's a time and place for everything but not now!"</p>`;
                document.querySelector('#stat-page').setHTML(errorMsg);
                document.querySelector('img').src = './assets/images/MissingNo.1.webp';
                norrisBox.setAttribute('style', 'display:flex');
                document.querySelector('#norris-quote').textContent = 'That\'s not a Pokémon, LOL.';
                return;
            } else {
            
            document.querySelector('#norris-quote').textContent = '';
            body.setAttribute('style', 'background-image: url(./assets/images/city-landscape.webp);')
            
            return response.json();}

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
            // norrisFact(name);//displays norris-pokemon fact

// added event listener to down arrow in norris quote then display norris-pokemon fact
            norrisBtn.addEventListener('click', function (event) {
                event.preventDefault();
                norrisQuote.textContent = ''
                if (!event.detail || event.detail === 1) { norrisFact(name) }
            });
            
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
            // let cnQuote = data.value;            
            let cnQuote = data.value;
            console.log(cnQuote)
     


            let possessiveNorris = 'Chuck Norris\'';
            let insideQuotesNorris = `'Chuck Norris'`;
            let pkmnQuote = cnQuote.replaceAll(/chuck? norris?/ig, pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1));
            let pkmnPossessive = cnQuote.replaceAll(/chuck norris?'?s?/ig, pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1) + `'s`);
            let pkmnInsideQuotes = cnQuote.replaceAll(`'Chuck Norris'`, `'` + pokeName.trim().charAt(0).toUpperCase() + pokeName.slice(1) + `'`);

            
            

            let i = 0;


            if (cnQuote.includes(possessiveNorris)) {
                console.log(pkmnPossessive)

                // norrisQuote.textContent = `${pkmnPossessive}`;            
                
                // norrisQuote.textContent = ''            
                // function typeWriter() {
                //     if (i < pkmnPossessive.length) {
                //         norrisQuote.textContent += pkmnPossessive.charAt(i); 
                //         i++
                //         setTimeout(typeWriter, 20);
                //     };
                // };
                // typeWriter();

            } else if (cnQuote.includes(insideQuotesNorris)) {
                console.log(pkmnInsideQuotes)

                // norrisQuote.textContent = `${pkmnInsideQuotes}`;            

                // norrisQuote.textContent = ''
                // function typeWriter() {
                //     // let i = 0;

                //     if (i < pkmnInsideQuotes.length) {
                //         norrisQuote.textContent += pkmnInsideQuotes.charAt(i);
                //         i++
                //         setTimeout(typeWriter, 20);                        

                //     };
                // };
                // typeWriter();

            } else {
                console.log(pkmnQuote)

                // norrisQuote.textContent = `${pkmnQuote}`;            

                // norrisQuote.textContent = ''
                // function typeWriter() {
                //     // let i = 0;
                //     if (i < pkmnQuote.length) {
                //         norrisQuote.textContent += pkmnQuote.charAt(i);
                //         i++
                //         setTimeout(typeWriter, 20);
                //     };
                // };
                // typeWriter();

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