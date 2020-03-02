

let movies = document.getElementsByClassName("card-title");

function toogleTitle(card, pDisplay) {

	let num = card.id.split("-")[1];
	let idTitle = "title-" + num;
	let title = document.getElementById(idTitle);
	if (title){ title.style.opacity = pDisplay;}
}

function titles(path, opa) {

	let filtro = path.filter((i) => {
		return i.id && i.id.includes("contenedor");
	});

	let card = filtro[0];

	toogleTitle(card, opa);
}

for (var movie of movies) {
	movie.onmouseover = (e) => {
		/*titles(e.path,'0');*/
		toogleTitle(e.target, "0");
	};
	movie.onmouseout = (e) => {
		/*titles(e.path,'1');*/
		toogleTitle(e.target, "1");
	};
}

$(document).ready(function () {
	$('.modal').modal();
});

var currentMovie = ''

const clickModal = (e) => {
	let idButton = e.target.id;
	let idMovie = idButton.split("-");
	currentMovie = idMovie[1];
}

const reviewMovieStar = (e) => {
	let idstar = e.target.id;
	let reviewV = idstar.split("-")[1]
	postData(`/movies/review/`, { movie: currentMovie, review: reviewV })
		.then((data) => {
			$('#modal1').modal('close');
		});

}

let reviews = document.getElementsByClassName("btn-floating halfway-fab");


let stars = document.getElementsByClassName("star");

for (let star of stars) {
	star.onclick = reviewMovieStar;
}

for (let reviewButton of reviews) {
	reviewButton.onclick = clickModal;
}

$(document).ready(function () {
	$('.tooltipped').tooltip();
});



async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}
