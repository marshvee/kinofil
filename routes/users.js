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
		MongoUtils.findById((movie) => {
			let list = {};
			list[listName] = movieId;

			MongoUtils.updateOne((user) => {
				res.send(user);
			},
				colName,
				{ username: req.params.username },
				{ $push: list }
			);
		},
			"Movies",
			movieId);
	});

module.exports = router;
