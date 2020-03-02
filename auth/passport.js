var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var auth = require("./auth.js");

passport.serializeUser(function (user, done) {
	console.log("serializing " + user.username);
	done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (obj, done) {
	console.log("deserializing " + obj);
	done(null, obj);
});

passport.use("login", new LocalStrategy(
	{
		usernameField: "username",
		passwordField: "password",
		passReqToCallback: true // allows us to pass back the entire request to the callback
	},
	auth.login
));

passport.use("signup", new LocalStrategy(
	{
		usernameField: "username",
		passwordField: "password",
		passReqToCallback: true // allows us to pass back the entire request to the callback
	},
	auth.signup
));

module.exports = passport;