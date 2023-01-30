// Set up mongoose connection
const mongoose = require("mongoose");
const item = require("./models/item");

mongoose.set('strictQuery', false);
const mongoDB = "mongodb://localhost:27017";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected...");
  item.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
}
