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
    //let pokemonList = document.querySelector(".pokemon-list");
    let pokemonList = $('.pokemon-list')
    //let listpokemon = document.createElement("li");
    let listpokemon = $('<li></li>')
    //let button = document. createElement("button");
    
    //button.innerText = pokemon.name;
    let button = $('<button class= "button-class">'+pokemon.name+'</button>')
    //button.classList.add("button-class");
    //listpokemon.appendChild(button);
    listpokemon.append(button)
    //pokemonList.appendChild(listpokemon);
    pokemonList.append(listpokemon)
  //   button.addEventListener("click", function(event) {
  //     showDetails(pokemon);
  // });
  button.on('click', function(){
    showDetails(pokemon);
  })
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
      pokemon.imageUrl = details.sprites.other.dream_world.front_default;
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
      showModal(pokemon)
    });
  }
function showModal(pokemon){
  //let modalContainer = document.querySelector("#modal-container");
  let modalContainer = $('#modal-container');
  //modalContainer.innerText = "";
  modalContainer.empty();
   //let modal = document.createElement("div");
   let modal = $('<div class="modal"></div>')
   //modal.classList.add("modal");
  //  let closeButtonElement = document.createElement("button");
  //  closeButtonElement.classList.add("modal-close");
  //  closeButtonElement.innerText = "close"; 
   //closeButtonElement.addEventListener("click",hideModal);
   let closeButtonElement = $('<button class="modal-close">'+ "close"+'</button>')
   closeButtonElement.on('click', hideModal);
  //  let nameElement = document.createElement("h1");
  //  nameElement.innerText = pokemon.name;
   let nameElement = $('<h1>'+pokemon.name+'</h1>')
  //  let imageElement = document.createElement("img");
  //  imageElement.classList.add("modal-img");
  //  imageElement.setAttribute("src",pokemon.imageUrl)
   let imageElement = $('<img class="modal-img">');
   imageElement.attr("src", pokemon.imageUrl)
  //  let heightElement = document.createElement("p");
  //  heightElement.innerText = "Height: " + pokemon.height
   let heightElement = $('<p>'+"Height: " + pokemon.height+'</p>')
  //  modal.appendChild(closeButtonElement);
  //  modal.appendChild(nameElement);
  //  modal.appendChild(imageElement);
  //  modal.appendChild(heightElement);
  //  modalContainer.appendChild(modal);
  //  modalContainer.classList.add("is-visible");
   modal.append(closeButtonElement);
   modal.append(nameElement);
   modal.append(imageElement);
   modal.append(heightElement);
   modalContainer.append(modal);
  modalContainer.addClass('is-visible')
}
// function hideModal(){
//   let modalContainer = document.querySelector("#modal-container");
//   modalContainer.classList.remove("is-visible");
// }
function hideModal(){
  let modalContainer = $("#modal-container");
  modalContainer.removeClass("is-visible");
}
window.addEventListener("keydown", (e) => {
  let modalContainer = document.querySelector("#modal-container");
  if (
    e.key === "Escape" &&
    modalContainer.classList.contains("is-visible")
  ) {
    hideModal();
  }
});
// jQuery(window).on("keydown", e => {
//   var $modalContainer = $("#modal-container");
//   if (e.key === "Escape" && $modalContainer.hasClass("is-visible")) {
//     hideModal();
//   }
// });

//Modal hides if clicked outside of it
modalContainer = document.querySelector("#modal-container");
modalContainer.addEventListener("click", (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});
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

