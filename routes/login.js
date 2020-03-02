var express = require("express");
var router = express.Router();

module.exports = function (passport) {
	/* GET users listing. */
	router.get("/login", function (req, res) {
		res.render("login", { message: req.flash("message") });
	});

	router.post("/login",
		passport.authenticate("login", {
			successRedirect: "/movies",
			failureRedirect: "/login",
			failureFlash: true
		})
	);

	router.get("/signup", function (req, res) {
		res.render("signup", { message: req.flash("message") });
	});

	router.post("/signup",
		passport.authenticate("signup", {
			successRedirect: "/movies",
			failureRedirect: "/signup",
			failureFlash: true
		})
	);

	return router;
};