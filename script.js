const apiKey = 'thewdb'; // OMDb public API key
const movieContainer = document.getElementById('movieContainer');
const popularSection = document.getElementById('popularSection');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// 🎬 Handle Movie Search
searchBtn.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') return;

  // Hide the popular picks section
  if (popularSection) popularSection.style.display = 'none';

  // Fetch movies from OMDb API
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      movieContainer.innerHTML = '';

      if (data.Search) {
        data.Search.forEach(movie => {
          const card = `
            <div class="col-md-3 mb-4">
              <div class="card shadow h-100 movie-card" data-id="${movie.imdbID}">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'}" 
                     class="card-img-top" alt="${movie.Title}">
                <div class="card-body text-center">
                  <h5 class="card-title">${movie.Title}</h5>
                  <p class="card-text text-muted">${movie.Year}</p>
                </div>
              </div>
            </div>`;
          movieContainer.innerHTML += card;
        });

        activateMovieCards();
      } else {
        movieContainer.innerHTML = '<p class="text-center text-danger">No results found.</p>';
      }
    })
    .catch(() => {
      movieContainer.innerHTML = '<p class="text-center text-danger">Something went wrong. Try again!</p>';
    });
});

// 🎬 Function to make all movie cards clickable (including Popular Picks)
function activateMovieCards() {
  const cards = document.querySelectorAll('.movie-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const movieId = card.getAttribute('data-id');
      localStorage.setItem('selectedMovieId', movieId);
      window.location.href = 'details.html';
    });
  });
}

// 🧠 Run it once on page load so popular picks are clickable too
activateMovieCards();
