var express = require("express");
var router = express.Router();
var auth = require("../auth/auth.js");

module.exports = function (passport) {
	/* GET users listing. */
	router.get("/login", function (req, res) {
		res.render("login", { message: req.flash("message") });
	});

	router.post("/login", auth.ensureNotAuthenticated,
		passport.authenticate("login", {
			successRedirect: "/movies",
			failureRedirect: "/login",
			failureFlash: true
		})
	);

	router.get("/signup", function (req, res) {
		res.render("signup", { message: req.flash("message") });
	});

	router.post("/signup", auth.ensureNotAuthenticated,
		passport.authenticate("signup", {
			successRedirect: "/movies",
			failureRedirect: "/signup",
			failureFlash: true
		})
	);

	router.get("/logout", auth.ensureAuthenticated, function (req, res) {
		req.logout();
		res.redirect("/");
	});

	return router;
};