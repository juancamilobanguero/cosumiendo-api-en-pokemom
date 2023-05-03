const pokemonContainer = document.querySelector(`.pokemon-container`);
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let offset = 1;
let limit = 8;

previous.addEventListener(`click`,() => {
    if(offset  != 1){
        offset -= 9;
        removeChildNodes(pokemonContainer);
        fetchpokemons(offset,limit);
    }
   
})

next.addEventListener(`click`,() => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchpokemons(offset,limit);
})

function fetchpokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
    //    console.log( data );
       createpokemon(data)
       spinner.style.display = "none";
    });
}

function fetchpokemons(offset, limit){
    spinner.style.display = "block";
    for(let i = offset; i <= offset + limit; i++){
        fetchpokemon(i);
    }
}

function createpokemon(pokemon) {
    const card = document.createElement("div");
    card. classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement(`img`);

    sprite.setAttribute( 'src', pokemon.sprites.front_default );
    sprite.setAttribute( 'alt', pokemon.name );

    spriteContainer.appendChild(sprite);

    console.log( spriteContainer );

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`


    const name = document.createElement("p")
    name.classList.add("name");
    name.textContent = pokemon.name;


    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
   

    pokemonContainer.appendChild(card);
}

function removeChildNodes(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

fetchpokemons(offset,limit);