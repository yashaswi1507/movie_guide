const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

//function to fetch movie data
const getMovieInfo = async(movie) => {
        try {


            const myApikey = "a2c89449";
            const url = `http://www.omdbapi.com/?apikey=${myApikey}&t=${movie}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch movie.")
            }

            const data = await response.json();

            showMovieData(data);
        } catch (error) {
            showErroMessage("No Movie Foundd!!");
        }

    }
    //function to show movie data
const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');
    // use destructuring assignment to extract properties from data object
    const { Title, Rated, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div');

    //movie element
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2> 
                                  <p><strong>Rated: &#11088; </strong>${Rated}</p>`;

    //movieGenreElement
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);
    movieElement.innerHTML += `<p><strong>Released:</strong>${Released}</p> 
                                   <p><strong>Duration:</strong>${Runtime}</p> 
                                   <p><strong>Cast:</strong>${Actors}</p> 
                                   <p><strong>Plot:</strong>${Plot}</p>`;
    //creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src"${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);

    movieContainer.appendChild(movieElement);


}

//function of error message

const showErroMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}


//function to handle form submission
const handleFormSubmission = (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName != '') {
        showErroMessage("Fetching Movie Information....");
        getMovieInfo(movieName);
    } else {
        showErroMessage("Enter Movie Name");
    }
}

//adding event listener to search form
searchForm.addEventListener('submit', handleFormSubmission);