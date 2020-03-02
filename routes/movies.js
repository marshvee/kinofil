var express = require("express");
var MongoUtils = require("../db/MongoUtils.js");
var router = express.Router();
const colName = "Movies";
/* GET movies listing. */
router.get("/", function (req, res) {

	MongoUtils.findMany((movies) => {
		res.render("movies", { movies });
	}, colName);

});
/* GET movie detail */
router.get("/:id", function (req, res) {

	MongoUtils.findById((movie) => {
		res.render("movie", { movie });
	}, colName, req.params.id);

});
/* POST movie review */
router.post("/:id/reviews", function (req, res) {

	MongoUtils.findMany((list) => {
		res.send(list);
	}, colName);

});

module.exports = router;
