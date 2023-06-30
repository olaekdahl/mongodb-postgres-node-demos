// Select the database to use.
use('test');

// Create a collection
db.createCollection("sales")

// Insert a document into the sales collection.
db.sales.insertOne({
  item: "Apple",
  price: 0.5,
  quantity: 10,
  date: new Date("2023-05-10")
})

// Insert a another document into the sales collection.
db.sales.insertOne({
  item: "Banana",
  price: 1,
  quantity: 5,
  date: new Date("2023-05-10")
})

db.sales.insertOne({
  item: "Pineapple",
  price: 1,
  quantity: 5
})

db.sales.find({});

// Insert many documents into the sales collection.
db.sales.insertMany([
  { 'a': 'b', 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'x': 'z', 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Insert a another document into the sales collection with a new attribute.
db.sales.insertOne({
  item: "Peanut butter",
  price: 1,
  quantity: 5,
  rating: 10,
  date: new Date("2023-05-10")
});

// Get all documents
db.sales.find({});

// Projections
db.sales.find({}, {_id: 0, item: 1, price: 1});

//Find specific document using id
db.sales.findOne({_id: ObjectId("649f0d1382b470d949e41a67")});

// Find specific document using quantity field
db.sales.findOne({quantity: 5}, {_id: 0, item: 1, price: 1});

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.sales.find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred on 2014-04-04.`);
// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.sales.aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);
