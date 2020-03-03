const formSearch = document.querySelector("#formSearch");


const displayMovies = (movies) => {
	const movieslist = document.querySelector("#movies-list");

	movieslist.innerHTML = "";

	movies.forEach((movie, index) => {
		let idCon = "contenedor-" + (index + 1);
		let idTitle = "title-" + (index + 1);
		let toAppendL = document.createElement("div");
		toAppendL.className = "col s2 m3";
		toAppendL.innerHTML = `
    
					<a href="/movies/${movie._id}">
						<div class="movies-card card">

							<div class="card-image">
								<img class="movie-image" src=${movie.poster} height="100%" width="100%" />

								<span class="descrip card-title" id=${ idCon}>${movie.overview.substring(0, 190)}
									...
								</span>

								<span class="movie-title card-title" id=${ idTitle}>${movie.title}</span>

							</div>
						</div>
					</a>
        `;
		movieslist.appendChild(toAppendL);
	});
};

const onSearch = (event) => {

	const query = document.querySelector("#formSearch input").value;
	if (query) {
		fetch(`/movies/search/${query}`)
			.then(res => res.json())
			.then(movies => {
				displayMovies(movies);
			});
	}
	else {
		window.location.href = "/movies";
	}
	event.preventDefault();
}

formSearch.addEventListener("submit", onSearch);
