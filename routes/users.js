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
			res.send(user);
		},
			colName,
			{ username: req.params.username });
	});

router.put("/:username",
	//auth.ensureAuthenticated, auth.confirmAuthorization, 
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
