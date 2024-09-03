const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const movieList = document.getElementById("movie-list");

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "8eb49ca74a05e2bf5cebc0de322cd2d4";
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

searchButton.addEventListener("click", function () {
  searchMovies();
});

searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    searchMovies();
  }
});

let searchTimeout;
// debouncing
searchInput.addEventListener("input",function(){            

    clearTimeout(searchTimeout)    

    searchTimeout = setTimeout(function(){
        searchMovies()
    },500)
  
})

function searchMovies() {
  const query = searchInput.value.trim();

  if (!query) {
    alert("Please Enter a movie title");
    return;
  }

  const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayMovies(data.results);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayMovies(movies) {
  movieList.innerHTML = "";
  movies.map((movie) => {
    const movieItem = document.createElement("div");
    movieItem.className = "col-md-4 mb-4";

    const posterUrl = movie.poster_path
      ? `${imageBaseUrl}/${movie.poster_path}`
      : "https://demofree.sirv.com/nope-not-here.jpg?w=300";
      
    movieItem.innerHTML = `
    <div class="card h-100">
    <img src=${posterUrl} class="card-img-top"/>
        <div class="card-body">
            <h5>${movie.title}</h5>
            <p class="card-text">
            <strong>Release Date : </strong>
            <span>${formatReleaseDate(movie.release_date)}</span>
            </p>
            <p class="card-text">
            <strong>Rating : </strong>${getRatingStars(movie.vote_average)}
            </p>
            <p class="card-text">
            <strong>Description : </strong><span class="text-primary">${movie.overview}</span>
            </p>
        </div>
    </div>
    `;

    movieList.appendChild(movieItem);
    
  });
}

function getRatingStars(rating) {
  const starCount = Math.round(rating / 2);
  const fullStar = `<i class="fas fa-star"></i>`;
  const emptyStar = `<i class="far fa-star"></i>`;

  let stars = "";

  for (let i = 0; i < 5; i++) {
    if (i <= starCount) {
      stars += fullStar;
    } else {
      stars += emptyStar;
    }
  }
  return stars;
}

function formatReleaseDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formatDate = new Date(dateString).toLocaleDateString("en-US",options)
  return formatDate;
}

// 

