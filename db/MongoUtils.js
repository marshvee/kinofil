const mongodb = require("mongodb");
const fs = require("fs");

function MongoUtils() {

	const mu = {},
		credenciales = fs.readFileSync(".././credenciales.json"),
		jsonContent = JSON.parse(credenciales),
		dbName = "MoviesReviews",
		uri = `mongodb+srv://${jsonContent.usuario}:${jsonContent.clave}@cluster0-h9ykn.mongodb.net/${dbName}?retryWrites=true&w=majority`;



	mu.find = (cbk, colName, query) => {
		const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
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

	mu.findById = (cbk, colName, id) => {
		const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
		client.connect(err => {
			if (err) throw err;
			console.log(id, "ID");
			if (id == undefined) {
				throw new Error("ID can't be null or udefined");
			}
			const o_id = new mongodb.ObjectID(id);
			const collection = client.db(dbName).collection(colName);
			collection.find({ _id: o_id }).toArray((err, list) => {
				if (err) throw err;
				cbk(list);
				client.close();
			});
		});
	};

	return mu;

}

module.exports = MongoUtils();