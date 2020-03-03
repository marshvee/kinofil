var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("./auth/passport.js");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var moviesRouter = require("./routes/movies");
var authRouter = require("./routes/authentication");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(session({ secret: process.env.secretKey, saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
	res.locals.login = req.isAuthenticated();
	if (req.user) {
		res.locals.user = req.user;
		console.log(res.locals.user);
	}
	next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use("/", authRouter(passport));

app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res) {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
