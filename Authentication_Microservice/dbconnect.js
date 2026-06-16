// STEP-1: IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

// Database Connection URL (localhost)
const uri = 'mongodb://sreymomchea9988:Sreymom12345@ac-cgzu5mo-shard-00-00.kvzc8ej.mongodb.net:27017,ac-cgzu5mo-shard-00-01.kvzc8ej.mongodb.net:27017,ac-cgzu5mo-shard-00-02.kvzc8ej.mongodb.net:27017/?ssl=true&replicaSet=atlas-wggdju-shard-0&authSource=admin&appName=Cluster0';

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // STEP-2: ESTABLISH CONNECTION WITH MONGODB DATABASE
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // comment out disconnect so connection stays open
    // await mongoose.disconnect();
  }
}

run().catch(console.dir);

// STEP-3: EXPORT MODULE
module.exports = mongoose;