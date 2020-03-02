var express = require("express");
var router = express.Router();

const MongoUtils = require("../db/MongoUtils.js");
const colName = "Users";
/* GET users listing. */
router.get("/", function (req, res) {

	MongoUtils.find((list) => {
		res.send(list);
	}, colName);

});

module.exports = router;
