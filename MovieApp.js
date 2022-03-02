let formContainer = document.querySelector(".form-container");
let searchLine = document.querySelector(".search-line");
let main = document.querySelector("main");
let resultsContainer = document.querySelector(".results-container");

// fetch movies
let getMovies = async (inputValue) => {
  let response = await fetch(
    `https://www.omdbapi.com/?s=${inputValue}&apikey=535b116`
  );

  if (!response.ok) {
    throw new Error("Something Went Wrong");
  }
  let moviesObj = await response.json();
  let movies = moviesObj.Search;
  return movies;
};

// submit
if (formContainer) {
  formContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = searchLine.value;
    resultsContainer.classList.remove("show");

    // display a movie list on the main screen
    getMovies(inputValue)
      .then((movies) => {
        let listOfMovies = movies
          .map((movie) => {
            return `<article class="article-container">
    <img src="${movie.Poster} alt= "movie poster"> 
    <div class="movie-details"> 
    <h2>${movie.Title}</h2>
    <p>Year: ${movie.Year}</p>
    </div>
    <div class="button-container">
    <button id=${movie.imdbID} class="show-more-button">Show More</button>
    <div>
    </article>`;
          })
          .join("");
        main.innerHTML = listOfMovies;

        // get a movie's id by clicking on a button and redirect to another file

        let showMoreButton = document.querySelectorAll(".show-more-button");

        showMoreButton.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            let id = e.currentTarget.id;
            showMore(id);
          });
        });
      })
      .catch((error) => console.log(error.message));
  });
}

if (formContainer) {
  formContainer.addEventListener("input", (e) => {
    e.preventDefault();
    if (searchLine.value.length >= 1) {
      let inputValue = searchLine.value;
      resultsContainer.classList.add("show");
      getMovies(inputValue)
        .then((movies) => {
          // show the list
          let listOfMovies = movies
            .map((movie) => {
              return `<ul class="list-container">
        <a id=${movie.imdbID} class="one-movie">
      <li><img src="${movie.Poster} alt= "movie poster" width="43px" height="49px"></li>
      <div class="movie-description"> 
      <li><h2>${movie.Title}</h2></li>
      <li><p>Year: ${movie.Year}</p></li>
      </div>
      </a>
      </ul>`;
            })
            .join("");
          resultsContainer.innerHTML = listOfMovies;

          // get a movie's id by clicking on a button and redirect to another file

          let oneMovie = document.querySelectorAll(".one-movie");

          oneMovie.forEach((movie) => {
            movie.addEventListener("click", (e) => {
              e.preventDefault();
              console.log(e.currentTarget.id);
              let id = e.currentTarget.id;
              showMore(id);
            });
          });
        })
        .catch((error) => console.log(error.message));
    } else if (searchLine.value.length < 1) {
      resultsContainer.classList.remove("show");
    }
  })
}

// the function to tranfer id to another file

let showMore = (id) => {
  sessionStorage.setItem("movieID", id);
  window.location.href = "./OneMovie.html";
};
