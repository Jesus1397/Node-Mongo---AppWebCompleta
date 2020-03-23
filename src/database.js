const mongoose = require("mongoose");

const { MongoDbHost, MongoDbName } = process.env;

const MongoDbUrl = `mongodb://${MongoDbHost}/${MongoDbName}`;

mongoose
  .connect(MongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(db => {
    console.log("Database is connected");
  })
  .catch(error => {
    console.error(error);
  });
