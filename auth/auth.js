var MongoUtils = require("../db/MongoUtils.js");
var bcrypt = require("bcryptjs");
const colName = "Users";

const isValidPassword = function (user, password) {
	return bcrypt.compareSync(password, user.password);
};

// Generates hash using bCrypt
var createHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Simple route middleware to ensure user is authenticated.
exports.ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	req.session.error = "Please log in!";
	res.redirect("/login");
};

exports.ensureNotAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) return next();
	req.session.error = "You are already logged in!";
	res.redirect("/");
};

exports.confirmAuthorization = (req, res, next) => {
	if (req.user.username === req.params.username) return next();
	req.session.error = "You aren't authorized to do this!";
};

exports.login = function (req, username, password, done) {
	// check in mongo if a user with username exists or not
	MongoUtils.findOne(
		(user) => {
			// Username does not exist, log error & redirect back
			if (!user) {
				console.log("User Not Found with username " + username);
				return done(null, false,
					req.flash("message", "User Not found."));
			}
			// User exists but wrong password, log the error 
			if (!isValidPassword(user, password)) {
				console.log("Invalid Password");
				return done(null, false,
					req.flash("message", "Invalid Password"));
			}
			// User and password both match, return user from 
			// done method which will be treated like success
			return done(null, user);
		},
		colName,
		{ "username": username }
	);
};

exports.signup = function (req, username, password, done) {
	let findOrCreateUser = () => {
		// find a user in Mongo with provided username
		MongoUtils.findOne(
			(err, user) => {
				// In case of any error return
				if (err) {
					console.log("Error in SignUp: " + err);
					return done(err);
				}
				// already exists
				if (user) {
					console.log("Username already exists");
					return done(null, false,
						req.flash("message", "Username already in use, please try a different one."));
				}
				// if there is no user with that email
				MongoUtils.findOne(
					(user) => {
						// already exists
						if (user) {
							console.log("Email already exists");
							return done(null, false,
								req.flash("message", "There already exists an account with this email."));
						}
						// create the user
						var newUser = {};
						newUser.username = username;
						newUser.password = createHash(password);
						newUser.email = req.body.email;
						newUser.watching = [];
						newUser.watched = [];
						newUser.watchlist = [];
						newUser.favorites = [];
						newUser.lists = [];

						MongoUtils.insertOne(
							(newUser) => {
								console.log("User Registration succesful");
								return done(null, newUser);
							},
							colName,
							newUser
						);
					},
					colName,
					{ "email": req.body.email }
				);
			},
			colName,
			{ "username": username }
		);
	};
	// Delay the execution of findOrCreateUser and execute 
	// the method in the next tick of the event loop
	process.nextTick(findOrCreateUser);
};