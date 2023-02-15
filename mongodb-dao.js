const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const db = client.db("test");

// get connection info
async function connect() {
  try {
    const conn = await client.connect();
    console.log(conn);
  } catch (error) {
    console.error(error);
    return error;
  }
}

const getAllSales = async (callback) => {
  try {
    const salesCollection = db.collection("sales");
    const data = await salesCollection.find().toArray();
    callback(data);
    cleanup();
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.getAllSales = getAllSales;

const getSaleItem = async (item) => {
  try {
    const filter = { item: item };
    const salesCollection = db.collection("sales");
    const data = await salesCollection.find(filter).toArray();
    console.log(data);
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.getSaleItem = getSaleItem;

const getSaleItemById = async (id) => {
  try {
    const filter = id;
    const salesCollection = db.collection("sales");
    const data = await salesCollection.find(filter).toArray();
    console.log(data);
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.getSaleItemById = getSaleItemById;

const insertSaleItem = async (newItem, callback) => {
  try {
    const salesCollection = db.collection("sales");
    const status = await salesCollection.insertOne(newItem);
    callback(null, status);
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.insertSaleItem = insertSaleItem;

const updateSaleItem = async (item, update) => {
  try {
    const filter = { item: item };
    const data = { $set: { price: update } };
    const salesCollection = db.collection("sales");
    const status = await salesCollection.updateOne(filter, data);
    console.log(status);
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.updateSaleItem = updateSaleItem;

const deleteSaleItem = async (item) => {
  try {
    const filter = { item: item };
    const salesCollection = db.collection("sales");
    const status = await salesCollection.deleteOne(filter);
    console.log(status);
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.deleteSaleItem = deleteSaleItem;

const cleanup = (event) => {
  client.close();
  process.exit();
};

// SIGINT vs SIFTERM https://unix.stackexchange.com/questions/31637/ctrl-c-will-not-kill-process/231439#231439
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);


//-------------------------------------- TEST -------------------------------------
// connect();
// use dummy placeholder for callback function () => {}
let processData = (data) => {console.log(data);}
getAllSales(processData);
// getSaleItem('abc');
// const newItem = {
//   item: "NEW",
//   price: 10,
//   quantity: 200,
//   date: new Date("2014-03-01T08:00:00Z"),
// };
// insertSaleItem(newItem, (err, status) => {
//   console.log(status);
//   const id = status.insertedId;

//   // lookup inserted item by id
//   getSaleItemById(id);
// });

// const filter = 'abc', data = 100;
// updateSaleItem(filter, data);
// deleteSaleItem(filter);
