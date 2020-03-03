

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
		toogleTitle(e.target, "0");
	};
	movie.onmouseout = (e) => {
		toogleTitle(e.target, "1");
	};
}

$(document).ready(function () {
	$(".modal").modal();
});

var currentMovie = ""

const clickModal = (e) => {
	let idButton = e.target.id;
	let idMovie = idButton.split("-");
	currentMovie = idMovie[1];
}

const reviewMovieStar = (e) => {
	let idstar = e.target.id;
	let reviewV = idstar.split("-")[1]
	postData(`/movies/review/`, { movie: currentMovie, review: reviewV })
		.then(() => {
			$("#modal1").modal("close");
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
	$(".tooltipped").tooltip();
});



async function postData(url = "", data = {}) {
	const response = await fetch(url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache", 
		credentials: "same-origin", 
		headers: {
			"Content-Type": "application/json"
		},
		redirect: "follow"
		referrerPolicy: "no-referrer",
		body: JSON.stringify(data)
	});
	return await response.json();
}
