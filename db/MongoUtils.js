const mongodb = require("mongodb");
const fs = require("fs");

function MongoUtils() {

	const mu = {},
		dbName = "MoviesReviews",
		uri = `mongodb+srv://${process.env.usuario}:${process.env.clave}@cluster0-h9ykn.mongodb.net/${dbName}?retryWrites=true&w=majority`;



	mu.findMany = (cbk, colName, query) => {
		const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
		client.connect(err => {
			if (err) throw err;
			const collection = client.db(dbName).collection(colName);
			
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

	mu.findOne = (cbk, colName, query) => {
		const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
		client.connect(err => {
			if (err) throw err;
			const collection = client.db(dbName).collection(colName);
			console.log(query, "QUERY");
			if (query) {
				collection.findOne(
					query,
					(err, list) => {
						if (err) throw err;
						cbk(list);
						client.close();
					}
				);
			}
			else {
				collection.findOne(
					{},
					(err, list) => {
						if (err) throw err;
						cbk(list);
						client.close();
					}
				);
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
			collection.findOne(
				{ _id: o_id },
				(err, list) => {
					if (err) throw err;
					cbk(list);
					client.close();
				}
			);
		});
	};


	mu.insertOne = (cbk, colName, object) => {
		const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
		client.connect(err => {
			if (err) throw err;
			console.log(object, "OBJECT");
			if (object == undefined) {
				throw new Error("Object can't be null or udefined");
			}
			const collection = client.db(dbName).collection(colName);
			collection.insertOne(
				object,
				(err, result) => {
					if (err) throw err;
					cbk(result);
					client.close();
				}
			);
		});
	};

	return mu;

}

module.exports = MongoUtils();