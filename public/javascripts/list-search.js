const formSearch = document.querySelector("#formSearch");


const displayMovies = (movies) => {
  const movieslist = document.querySelector("#movies-list");

  movieslist.innerHTML = "";

  movies.forEach((movie,index) => {
    let idCon="contenedor-"+(index+1);
		let idTitle="title-"+(index+1);
    let toAppendL= document.createElement("div")
    toAppendL.className = "col s2 m4"
    toAppendL.innerHTML = `
    
					<a href="/movies/${movie._id}">
						<div class="card movies-card">

							<div class="card-image">
								<img class="movie-image" src=${movie.poster } height="100%" width="100%" />

								<span class="card-title descrip" id=${ idCon }>${ movie.overview.substring(0,200) }
									...
								</span>

								<span class="card-title movie-title" id=${ idTitle }>${ movie.title}</span>
								
								<a class="btn-floating halfway-fab waves-effect waves-light orange"><i
										class="material-icons">add</i></a>
							</div>
						</div>
					</a>
        `;
    movieslist.appendChild(toAppendL);
  });
}

const onSearch = (event) => {

  const query = document.querySelector("#formSearch input").value;
  if (query)
  {
  console.log(query, 'QUEY');
  fetch(`/movies/search/${query}`)
    .then(res => res.json())
    .then(movies => {
      console.log("llegaron las movies", movies);
      displayMovies(movies);
    });
  }
  else{
    console.log(query, 'QUEY');
    window.location.href="/movies";
  }
  event.preventDefault();
}

formSearch.addEventListener("submit", onSearch);