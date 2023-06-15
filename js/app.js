document.addEventListener("DOMContentLoaded", () => {
  const apiKey = 'dff016b0';
  const searchInput = document.getElementById('search-input');
  const filmContainer = document.getElementById('film-container');
  const noResultsMessage = document.getElementById('no-results');
  
  searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
      searchMovies(searchTerm);
    } else {
      clearFilmContainer();
    }
  });
  
  function searchMovies(searchTerm) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.Search) {
          clearFilmContainer();
  
          const moviesWithImages = data.Search.filter(movie => movie.Poster !== 'N/A');
  
          if (moviesWithImages.length > 0) {
            moviesWithImages.forEach(movie => {
              const filmCard = createFilmCard(movie);
              filmContainer.appendChild(filmCard);
            });
  
            noResultsMessage.textContent = '';
          } else {
            noResultsMessage.textContent = 'Aucun film avec image trouvé.';
          }
        } else {
          clearFilmContainer();
          noResultsMessage.textContent = 'Aucun film trouvé.';
        }
      })
      .catch(error => {
        console.log('Une erreur s\'est produite:', error);
      });
  }
  
  function clearFilmContainer() {
    filmContainer.innerHTML = '';
    noResultsMessage.textContent = '';
  }
  
  function createFilmCard(movie) {
    const filmCardItem = document.createElement('div');
    filmCardItem.classList.add('film-card-item');
    filmCardItem.onclick = function() {
      window.open(`https://www.imdb.com/title/${movie.imdbID}`, '_blank');
    };
  
    const filmTitle = document.createElement('h2');
    filmTitle.textContent = movie.Title;
    filmCardItem.appendChild(filmTitle);
  
    const filmPoster = document.createElement('img');
    filmPoster.src = movie.Poster;
    filmCardItem.appendChild(filmPoster);
  
    const filmYear = document.createElement('p');
    filmYear.textContent = `Année : ${movie.Year}`;
    filmCardItem.appendChild(filmYear);
  
    // Ajout de la description du film
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
      .then(response => response.json())
      .then(data => {
        if (data.Plot) {
          const filmDescription = document.createElement('p');
          filmDescription.textContent = `Description : ${data.Plot}`;
          filmCardItem.appendChild(filmDescription);
        }
        
        if (data.Director) {
          const filmDirector = document.createElement('p');
          filmDirector.textContent = `Réalisateur : ${data.Director}`;
          filmCardItem.appendChild(filmDirector);
        }
        
        if (data.Actors) {
          const filmActors = document.createElement('p');
          filmActors.textContent = `Acteurs : ${data.Actors}`;
          filmCardItem.appendChild(filmActors);
        }
        
        if (data.Genre) {
          const filmGenre = document.createElement('p');
          filmGenre.textContent = `Genre : ${data.Genre}`;
          filmCardItem.appendChild(filmGenre);
        }
      })
      .catch(error => {
        console.log('Une erreur s\'est produite lors de la récupération des informations:', error);
      });
  
    return filmCardItem;
  } 
  
  //mettre automatique dans la barre de recherche la première lettre en majuscule
  const input = document.getElementById('search-input');
  input.addEventListener('keyup', function(event) {
    const searchInput = event.target.value;
    const firstLetter = searchInput.charAt(0).toUpperCase();
    const restOfWord = searchInput.slice(1);
    input.value = firstLetter + restOfWord;
  });
  
  
  });
  