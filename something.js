const movieContainer = document.querySelector('.movie-container')
const searchButton = document.querySelector('.search-button')
const input = document.querySelector('.input-keyword')

searchButton.addEventListener('click', async function(){
  const movies = await getMovies(input.value);
  
  updateUI(movies)
})

function getMovies(keyword){
  return fetch('https://www.omdbapi.com/?apikey=704dc1f&s=' + keyword)
    .then(response => response.json())
    .then(response => response.Search)
}

function updateUI(movies){
  movies.map(e => {
    movieContainer.innerHTML = ''
    fetch('https://www.omdbapi.com/?apikey=704dc1f&i=' + e.imdbID)
      .then(response => response.json())
      .then(e => {
        const card = cards(e) + modals(e)
        movieContainer.insertAdjacentHTML('beforeend', card)
      })
  })
}


cards = e => {
    return `<div class="col-md-4 col-6 my-3">
                    <div class="card">
                        <img src="${e.Poster}" class="card-img-top">
                        <div class="card-body">
                        <h5 class="card-title">${e.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${e.Year}</h6>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${e.imdbID}">Show Details</button>
                        </div>
                    </div>
                </div>`
}

modals = e => {
    return `<div class="modal fade" id="${e.imdbID}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Description</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
                <div class="col-md-3 col-sm-12">
                    <img src="${e.Poster}" width="100%" class="img-fluid">
                </div>
                <div class="col-8">
                    <h5><b>${e.Title} (${e.Year})</b></h6>

                    <div><b>Director</b> : ${e.Director}</div>
                    <div><b>Actors</b> : ${e.Actors}</div>
                    <div><b>Writer</b> : ${e.Writer}</div>
                    <div><b>Plot</b> : ${e.Plot}</div>
                    <div><b>Genre</b> : ${e.Genre}</span></div>
                </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`
}