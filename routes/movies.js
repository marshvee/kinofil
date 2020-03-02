var express = require("express");
var MongoUtils = require("../db/MongoUtils.js");
var router = express.Router();
const colName = "Movies";

const buildQuery = (query) => ({
	title: new RegExp(`.*${query}.*`, "i")
});

/* GET movies listing. */
router.get("/", function (req, res) {
	if (req.query.search) {
		const query = buildQuery(req.query.search);
		console.log(query, "buscarMONGO");
		MongoUtils.findMany((movies) => {
			res.render("movies", { movies });
		}, colName, query);
	} else {
		MongoUtils.findMany((movies) => {
			res.render("movies", { movies });
		}, colName);
	}
});

/* GET movies search. */
router.get("/search/:title", function (req, res) {
	let title = new RegExp(`.*${req.params.title}.*`, "i");
	let query = { "title": title };
	console.log(query, "buscarMONGO")
	MongoUtils.findMany((movies) => {
		res.json(movies);
	}, colName, query);
});

/* POST review  */
router.post("/review", function (req, res) {

	let review= req.body.review
	let movie= req.body.movie
	console.log(review, "review")
	console.log(movie, "MOVIE")
	MongoUtils.postReview((x) => {
		res.json({status:'OK'});
	}, colName, review, movie);

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

