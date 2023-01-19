const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const moviesList = document.querySelector("[data-movies-list]");

if (searchBtn) {
  searchBtn.addEventListener("click", searchMovies);
}

async function searchMovies() {
  let res = await fetch(
    `https://www.omdbapi.com/?s=${searchInput.value.trim()}&apikey=704dc1f`
  );
  let data = await res.json();

  const movies = data.Search;

  movies.forEach(async (movie) => {
    let response = await fetch(
      `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=704dc1f`
    );
    let moviesListData = await response.json();

    moviesList.innerHTML += `
                <div class="cards">
                    <div class="card">
                        <img src=${moviesListData.Poster} class="card-poster" />
                        <div class="card-desc">
                            <h2 class="card-title">${moviesListData.Title}</h2>
                            <p class="card-genre">${moviesListData.Genre}</p>
                        </div>
                    </div>
                </div>
            `;
  });
}
