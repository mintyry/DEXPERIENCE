
function pokemon_of_the_day() {
    const today = dayjs().format("MM/DD/YYYY");
    console.log(today);

    let pokemon = localStorage.getItem(today);
    console .log (pokemon)
    
   

    if (pokemon === null) {
        console.log("Fetching new Pokemon...");
        const randomId = Math.floor(Math.random() * 200);
        const url = `https://pokeapi.co/api/v2/pokemon/${randomId}/`;
        
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const pokemonData = {
                    name: data.name,
                    id: data.id
                };
                console.log(pokemonData);

                // Saving the Pokemon data to localStorage
                localStorage.setItem(today, JSON.stringify(pokemonData));
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    } else {
        console.log("Pokemon already created:", pokemon);
    }
}

pod.addEventListener("click", function(){
    const today = dayjs().format("MM/DD/YYYY");
    // console.log(today);

    let pokemon = JSON.parse(localStorage.getItem(today));
    // console .log (pokemon) 
    // console .log (pokemon.name) 
    renderPokemon (pokemon.name)
})
pokemon_of_the_day();