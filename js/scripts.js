let pokemonRepository = (function () {
  // variable name
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // adding a for loop to all pokemons with a <div> created for a class in CSS for styling of the list made throuh the loop. Lastly using else if statements to provide heights for each pokemon.
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  //Using DOM manipulation to customize Pokemon buttons and add event listener.
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let row = $(".row");

      let card = $(
        '<div class="card mt-5" style="width: 18rem; margin:13px;"></div>'
      );
      let image = $('<img class="card-img-top" alt="...">');
      let title = $('<h5 class="card-title">' + pokemon.name + "</h5>");
      image.attr("src", pokemon.imageUrl);
      let body = $('<div class="card-body" style="text-align: center;"></div>');
      let button = $(
        '<button type="button" class="btn" style="background-color: #d88780; color: white" data-toggle="modal" data-target="#myModal">See profile</button>'
      );

      //append
      row.append(card);
      card.append(image);
      card.append(body);
      body.append(title);
      body.append(button);

      button.on("click", function (event) {
        showDetails(pokemon);
      });
    });
  }
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the pokemon
        pokemon.imageUrl = details.sprites.other.dream_world.front_default;
        pokemon.height = details.height;
        pokemon.types = Object.keys(details.types);
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }
  // show the modal content
  function showModal(item) {
    var modalBody = $(".modal-body");
    var modalTitle = $(".modal-title");
    var modalHeader = $(".modal-header");
    // var $modalContainer = $("#modal-container");
    //clear existing content of the model
    // modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    var nameElement = $("<h1>" + item.name + "</h1>");
    // // creating img in modal content
    var imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrl);
    var imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    // //creating element for height in modal content
    var heightElement = $("<p>" + "height : " + item.height + "</p>");
    // //creating element for weight in modal content
    var weightElement = $("<p>" + "weight : " + item.weight + "</p>");
    // //creating element for type in modal content
    var typesElement = $("<p>" + "types : " + item.types + "</p>");
    // //creating element for abilities in modal content
    var abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }
  function hideModal() {
    let modalContainer = $("#modal-container");
    modalContainer.removeClass("is-visible");
  }
  // window.addEventListener("keydown", (e) => {
  //   let modalContainer = document.querySelector("#modal-container");
  //   if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
  //     hideModal();
  //   }
  // });
  // jQuery(window).on("keydown", e => {
  //   var $modalContainer = $("#modal-container");
  //   if (e.key === "Escape" && $modalContainer.hasClass("is-visible")) {
  //     hideModal();
  //   }
  // });

  //Modal hides if clicked outside of it
  // modalContainer = document.querySelector("#modal-container");
  // modalContainer.addEventListener("click", (e) => {
  //   let target = e.target;
  //   if (target === modalContainer) {
  //     hideModal();
  //   }
  // });
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

// for (let i = 0; i < pokemonList.length; i++) {
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
