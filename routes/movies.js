var express = require("express");
const MongoUtils = require("../db/MongoUtils.js");
var router = express.Router();
const colName = "Movies";
/* GET movies listing. */
router.get("/", function (req, res) {

	MongoUtils.find((movies) => {
		res.render("movies", { movies });

	}, colName);

});
/* GET movie detail */
router.get("/:id", function (req, res) {

	MongoUtils.findById((movies) => {
		res.render("movie", { movie: movies[0] });
	}, colName, req.params.id);

});
/*HACER ESTO*/
router.post("/:id/comment", function (req, res) {

	MongoUtils.find((list) => {
		res.send(list);
	}, colName);

});

module.exports = router;
