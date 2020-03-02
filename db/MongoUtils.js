const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");

function MongoUtils() {

	const mu = {},
		credenciales = fs.readFileSync("./credenciales.json"),
		jsonContent = JSON.parse(credenciales),
		dbName = "MoviesReviews",
		uri = `mongodb+srv://${jsonContent.usuario}:${jsonContent.clave}@cluster0-h9ykn.mongodb.net/${dbName}?retryWrites=true&w=majority`;



	mu.find = (cbk, colName, query) => {
		const client = new MongoClient(uri, { useNewUrlParser: true });
		client.connect(err => {
			if (err) throw err;
			const collection = client.db(dbName).collection(colName);
			console.log(query, "QUERY");
			if (query) {
				collection.find(query).toArray((err, list) => {
					if (err) throw err;
					cbk(list);
					client.close();
				});
			}
			else {
				collection.find({}).toArray((err, list) => {
					if (err) throw err;
					cbk(list);
					client.close();
				});


			}
		});
	};
	return mu;

}

module.exports = MongoUtils();