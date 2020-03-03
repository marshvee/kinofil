var express = require("express");
var router = express.Router();
var auth = require("../auth/auth.js");

const MongoUtils = require("../db/MongoUtils.js");
const colName = "Users";

/* GET users listing. */
router.get("/", function (req, res) {
	MongoUtils.findMany((list) => {
		res.send(list);
	}, colName);
});

router.get("/:username",
	function (req, res) {
		MongoUtils.findOne((user) => {
			let colName2 = "Movies";
			let watched = user.watched;
			user.watched = [];
			let watching = user.watching;
			user.watching = [];
			let watchlist = user.watchlist;
			user.watchlist = [];
			let favs = user.favorites;
			user.favorites = [];

			let counter = favs.length + watched.length + watching.length + watchlist.length;
			for (movieId of watched) {
				MongoUtils.findById((movie) => {
					user.watched.push(movie);
					counter--;
					if (counter == 0) res.render("user", { user });
				},
					colName2,
					movieId
				)
			}
			for (movieId of watching) {
				MongoUtils.findById((movie) => {
					user.watching.push(movie);
					counter--;
					if (counter == 0) res.render("user", { user });
				},
					colName2,
					movieId
				)
			}
			for (movieId of watchlist) {
				MongoUtils.findById((movie) => {
					user.watchlist.push(movie);
					counter--;
					if (counter == 0) res.render("user", { user });
				},
					colName2,
					movieId
				)
			}
			for (movieId of favs) {
				MongoUtils.findById((movie) => {
					user.favorites.push(movie);
					counter--;
					if (counter == 0) res.render("user", { user });
				},
					colName2,
					movieId
				)
			}
		},
			colName,
			{ username: req.params.username });
	});

router.put("/:username",
	auth.ensureAuthenticated, auth.confirmAuthorization,
	function (req, res) {
		let movieId = req.body.movieId;
		let listName = req.body.listName;
		let toDo = req.body.toDo;
		MongoUtils.findById((movie) => {
			let list = {};
			list[listName] = movieId;
			if (toDo == "add") update = { $push: list };
			else if (toDo == "rem") update = { $pull: list };

			MongoUtils.updateOne((user) => {
				res.send(user);
			},
				colName,
				{ username: req.params.username },
				update
			);
		},
			"Movies",
			movieId);
	});

module.exports = router;
