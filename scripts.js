let pokemonRepository = ( function () {
// variable name
  let pokemonList = [
    //    Different names, types and height of each pokemon places in an array of objects.
    { name: "balbasure", types: ["grass", "poision"], height: "1" },
    { name: "Squirtle", types: ["rain-dish", "torrent"], height: "2" },
    { name: "Ivysaur", types: ["Chlorophyll", "overgrow"], height: "3" },
    { name: "charmander", types: ["fire"], height: "5" },
    { name: "caterpie", types: ["bug"], height: "7" },
  ];
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
    let listpokemon = document.createElement("li");
    let button = document. createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
  });
}
  function showDetails(pokemon){
    console.log(pokemon);
  }

  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem
  }
  
})()

pokemonRepository.add({name:"Eve", height: 8, types: ["speed"]})
// for (let i = 0; i < pokemonList.length; i++) {  
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  
 })