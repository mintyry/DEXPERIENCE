let recommendations = document.querySelector('#poke-recommendations');

function autoComplete() {
    for (let i = 0; i < pokeList.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', pokeList[i].name.charAt(0).toUpperCase() + pokeList[i].name.slice(1));
        console.log(pokeList[i].name)
        recommendations.appendChild(option);
        // console.log(recommendations);
    }
};

