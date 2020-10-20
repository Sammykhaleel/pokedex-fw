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
  // adding a for loop to all pokimons with a <div> created for a class in CSS for styling of the list made throuh the loop. Lastly using else if statements to provide heights for each pokemon.
  function add(pokemon){
    pokemonList.push(pokemon)
  }
  function getAll(){
    return pokemonList
  }
  return{
    add: add,
    getAll: getAll
  }
})()
console.log(pokemonRepository.getAll());
pokemonRepository.add({name:"Eve", height: 8, types: ["speed"]})
// for (let i = 0; i < pokemonList.length; i++) {
  pokemonRepository.getAll().forEach(function(pokemon){
  let size;
  if (pokemon.height <= 2) {
    size = "small pokimone";
  } else if (pokemon.height <= 5 && pokemon.height >= 3) {
    size = "medium pokimone";
  } else {
    size = "large pokemon";
  }
  document.write(
    '<div class = "box">' +
      pokemon.name +
      " (height: " +
      pokemon.height +
      "m)" +
      size +
      "<br>" +
      pokemon.types +
      "<br>" +
      "</div>"
  );
 } )