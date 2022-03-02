let sectionContainer = document.querySelector(".section-container");
let preloader = document.querySelector(".preloader");

// fetch a single movie

let getOneMovie = async(id) => {
    id = sessionStorage.getItem("movieID");

    let response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=535b116`);
    
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      let movie = await response.json();
      let poster = await movie.Poster;

      document.body.innerHTML = `<section class="section-container">
            <div class="img-container">
            <img src="${movie.Poster} alt= "movie poster">
            </div>
            <h2>${movie.Title}</h2>
            <p><span>Year:</span> ${movie.Year}</p>
            <p><span>Actors:</span> ${movie.Actors}</p>
            <p><span>Genre:</span> ${movie.Genre}</p>
            <p><span>Country:</span> ${movie.Country}</p>
            <p><span>Runtime:</span> ${movie.Runtime}</p>
            <p><span>Director:</span> ${movie.Director}</p>
            <p><span>Writer:</span> ${movie.Writer}</p> 
            <p><span>Plot:</span> ${movie.Plot}</p>
            <div class="go-back-container">
            <a class="go-back" href="index.html">Go Back</a>
            </div>
            </section>
            `  
            
            return poster
}

getOneMovie()
.then(poster => {
   getImage(poster)
  .then((moviePoster) => {  
    document.body.style.cssText = `
      bacgkround: white;
      background: ${getAverageColor(moviePoster)};
      background-repeat: no-repeat;
      background-size: cover;
       `
       console.log(`${getAverageColor(moviePoster)}`)
  })
})
.catch(error => console.log(error.message));

// take a URL string and turn it into an image to use getAverageColor function

let getImage = (imgURL) => {
  return new Promise ((resolve, reject) => {
  let img = new Image();
  img.addEventListener("load", () => {
    resolve(img)
  });
  img.addEventListener("error", reject);
  img.src = imgURL;
  img.crossOrigin = "Anonymous";
  })
}

// get average color of the image

let getAverageColor = (img) => {

let defaultColor = {r:199, g:199, b:199},
canvas = document.createElement("canvas"),
context = canvas.getContext && canvas.getContext("2d"), 
imgData, width, height, length,
rgb = {r:0, g:0, b:0},
count = 0;

height = canvas.height = img.naturalHeight ||
img.offsetHeight ||
img.height;

if(!context) {
  return defaultColor;
}

width = canvas.width = img.naturalWidth ||
img.offsetWidth ||
img.width;

context.drawImage(img, 0, 0);

try {
 imgData = context.getImageData(0, 0, canvas.width, canvas.height);  
} catch {
  return defaultColor;
}


length = imgData.data.length;   

for(let i = 0; i < length; i+=4) {
 
rgb.r += imgData.data[i];
rgb.g += imgData.data[i + 1];
rgb.b += imgData.data[i + 2];

count++;
}

rgb.r = Math.floor(rgb.r/count);
rgb.g = Math.floor(rgb.g/count);
rgb.b = Math.floor(rgb.b/count);

return `linear-gradient(rgba(${rgb.r},${rgb.g},${rgb.b},0.8),
rgba(255, 255, 255, 0.568))`
};


// preloader

document.addEventListener("readystatechange", () => {
  if(document.readyState == "complete") {
    preloader.classList.add("hide");
  }  
})



