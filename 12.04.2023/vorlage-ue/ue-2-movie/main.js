const API_KEY = "59cdfcc9";

// Eine Template-Literal-Funktion, um die HTML-Ausgabe für einen Film zu generieren
const generateMovieHtml = movie => `
  <section class="col">
    <div class="card">
        <img src="${movie.Poster}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <div class="card-text">
                <p>${movie.Year}<br>
                ${movie.Type}</p>
            </div>
        </div>
        <div class="card-footer">
          <a class="btn btn-dark btn-sm details-link" data-imdb-id="${movie.imdbID}">weitere Details</a>
        </div>
    </div>
  </section>
  `;

// Funktion zum Anzeigen von Filmen auf der Seite
function displayMovies(movies) {
    // Verwenden Sie Array.map, um die HTML-Ausgabe zu generieren
    const movieHtml = movies.map(generateMovieHtml).join('');
    // Fügen Sie die HTML-Ausgabe zum DOM hinzu
    document.getElementById('movies').innerHTML = movieHtml;
}

// Funktion zum Anzeigen der Seitennavigation
function displayPagination(page, totalPages, searchTerm) {
    document.querySelector('.pagination').innerHTML = `
        <li class="page-item"><a class="page-link" onclick="getMovies('${searchTerm}', ${page-1 || 1})">Previous</a></li>
        <li class="page-item"><a class="page-link" aria-disabled="true">Total: ${totalPages}</a></li>
        <li class="page-item"><a class="page-link" onclick="getMovies('${searchTerm}', ${page+1})">Next</a></li>
  `;
}

// Event-Listener für die Suchanfrage
document.getElementById('search-form').addEventListener('submit', event => {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value;
    getMovies(searchTerm, 1);
});


// Funktion zum Abrufen der Filmliste von der API
function getMovies(searchTerm, page) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`;
    fetch(url)
        .then(response => response.json())
        .then(({Search: movies = [], totalResults = 0}) => {
            const totalPages = Math.ceil(totalResults / 10);
            console.log(movies)
            displayMovies(movies);
            displayPagination(page, totalPages, searchTerm);
        })  
        .catch(error => console.error(error));
}

// Event-Listener für Details-Links
document.getElementById('movies').addEventListener('click', event => {
    if (event.target.matches('.details-link')) {
        event.preventDefault();
        const imdbID = event.target.getAttribute('data-imdb-id');
        getMovieDetails(imdbID);
    }
    
});

function getMovieDetails(imdbID) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.table(data)
            const modalHtml = `
                <div class="modal fade" id="movieModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${data.Title}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="row row-cols-2 g-4">
                            <img src="${data.Poster}" class="img-fluid mb-3">
                            <div>
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">#</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Jahr</td>
                                  <td>${data.Year}</td>
                                </tr>
                                <tr>
                                  <td>Writer</td>
                                  <td>${data.Writer}</td>
                                </tr>
                                <tr>
                                  <td>Länge</td>
                                  <td>${data.Runtime}</td>
                                </tr>
                                <tr>
                                  <td>Actors</td>
                                  <td>${data.Actors}</td>
                                </tr>
                                <tr>
                                  <td>Awards</td>
                                  <td>${data.Awards}</td>
                                </tr>
                                <tr>
                                  <td>BoxOffice</td>
                                  <td>${data.BoxOffice}</td>
                                </tr>
                                <tr>
                                  <td>Director</td>
                                  <td>${data.Director}</td>
                                </tr>
                                
                                  <td>Genre</td>
                                  <td>${data.Genre}</td>
                                </tr>
                                <tr>
                                  <td>Production</td>
                                  <td>${data.Production}</td>
                                </tr>
                                <tr>
                                  <td>Rated</td>
                                  <td>${data.Rated}</td>
                                </tr>
                              </tbody>
                            </table>
                                <ul>
                                  ${data.Ratings.map(rating => `<li>${rating.Source}: ${rating.Value}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        <p>${data.Plot}</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>`

            // Erstellen Sie ein DOM-Element aus dem Modal-HTML
            const modalElement = document.createRange().createContextualFragment(modalHtml);
            // Fügen Sie das Modal-Element zum Body hinzu
            document.body.appendChild(modalElement);
            // Holen Sie das Modal-Element
            const modal = document.getElementById('movieModal');
            // Zeigen Sie das Modal an
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            // Hinzufügen eines Event-Listeners, um das Modal zu leeren, wenn es geschlossen wird
            modal.addEventListener('hidden.bs.modal', () => {
                modal.remove();
            });
        })
        .catch(error => console.error(error));
}

