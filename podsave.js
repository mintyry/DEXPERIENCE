function pokemon_of_the_day() {

    const today = dayjs().format('MM/DD/YYYY');
    console.log(today);

    let pokemon = localStorage.getItem(today);
    console.log(pokemon);
    console.log(typeof pokemon);

    if (pokemon) {
        pokemon = JSON.parse(pokemon);
    } else {
        pokemon = null;
    }

    if (pokemon === null) {
        console.log('Fetching new Pokemon...');
        let pod = pokeList[Math.floor(Math.random() * pokeList.length)].name;


        // Saving the Pokemon data to localStorage
        localStorage.setItem(today, JSON.stringify(pod));
    } else {
        console.log('Pokemon already created:', pokemon);
    }
}


pod.addEventListener('click', function () {
    const today = dayjs().format('MM/DD/YYYY');
    // console.log(today);

    let pokemon = JSON.parse(localStorage.getItem(today)) || [];
    console.log(pokemon)
    // console .log (pokemon.name)
    renderPokemon(pokemon);
});

// const today = dayjs().format('MM/DD/YYYY');
// console.log(today);

// const yesterday = dayjs().subtract(1, 'day').format('MM/DD/YYYY');
// console.log(yesterday);

// const tomorrow = dayjs().add(1, 'day').format('MM/DD/YYYY');
// console.log(tomorrow)