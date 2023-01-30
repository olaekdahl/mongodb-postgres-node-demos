// {
//     _id: 7,
//     item: 'def',
//     price: 7.5,
//     quantity: 10,
//     date: 2015-09-10T08:43:00.000Z
// }

const { Int32, Double } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  _id: { type: Number, required: true },
  item: { type: String, required: true, maxLength: 100 },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  date_of_birth: { type: Date },
  date: { type: Date },
},
{ collection: "sales" });

module.exports = mongoose.model("Item", ItemSchema);