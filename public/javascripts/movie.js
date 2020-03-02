
function changeButton(toDo, listName) {
	let btnContainer = document.querySelector(`.${listName}`);
	btnContainer.innerHTML = "";
	let button = document.createElement("button");
	button.className = "btn";
	if (toDo == "add") {
		button.id = `rem-${listName}`;
		button.innerHTML = `Remove from ${listName}`;
		toDo = "rem";
	}
	else if (toDo == "rem") {
		button.id = `add-${listName}`;
		button.innerHTML = `Add to ${listName}`;
		toDo = "add";
	}
	btnContainer.appendChild(button);
	button = document.querySelector(`#${toDo}-${listName}`);
	button.addEventListener("click", generateOnClick(toDo, listName));
};

function action(toDo, listName, username, movieId) {
	let data = { toDo, listName, movieId };
	fetch(`/users/${username}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.catch(error => console.error('Error:', error));
}

function generateOnClick(toDo, listName) {
	if (toDo == "none") return () => {
	};
	if (toDo == "add" || toDo == "rem") return () => {
		let username = document.querySelector(".username").id;
		let movieId = document.querySelector(".card-content").id;
		action(toDo, listName, username, movieId);
		changeButton(toDo, listName);
	};
};

function addOnclickers() {
	for (listName of ["favorites", "watching", "watched", "watchlist"]) {
		for (toDo of ["add", "rem", "none"]) {
			let btn = document.querySelector(`#${toDo}-${listName}`);
			if (btn) btn.addEventListener("click", generateOnClick(toDo, listName));
		}
	}
};


addOnclickers();