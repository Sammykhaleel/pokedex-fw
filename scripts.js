let pokemonRepository = ( function () {
// variable name
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=900";

  // adding a for loop to all pokemons with a <div> created for a class in CSS for styling of the list made throuh the loop. Lastly using else if statements to provide heights for each pokemon.
  function add(pokemon){
    pokemonList.push(pokemon)
  }
  function getAll(){
    return pokemonList
  }
  //Using DOM manipulation to customize Pokemon buttons and add event listener.
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    // let ul = document.createElement("ul");
    // ul.classList.add("pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document. createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    // document.body.appendChild(ul);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
  });
}
function loadList() {
  return fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      
      });
    })
    .catch(function(e) {
      console.error(e);
    });
}
function loadDetails(pokemon) {
  let url = pokemon.detailsUrl;
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(details) {
      // Now we add the details to the pokemon
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = Object.keys(details.types);
    })
    .catch(function(e) {
      console.error(e);
    });
}
  function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  }
  
})()


// for (let i = 0; i < pokemonList.length; i++) {  
  pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  
 })
});