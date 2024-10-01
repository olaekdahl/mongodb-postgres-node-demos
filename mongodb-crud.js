// const MongoClient = require('mongodb').MongoClient;
import { MongoClient, ObjectId } from 'mongodb';
const url = 'mongodb://localhost:27017';
const dbName = 'demodb';
const collectionName = 'crud';

// CREATE EXAMPLE
async function createDocument() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.insertOne({ name: 'John Doe', age: 30 });
  console.log(`New document created with _id: ${result.insertedId}`);
  client.close();
  return result.insertedId;
}

// READ
async function readDocuments() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const documents = await collection.find().toArray();
  console.log(documents);
  client.close();
  return documents;
}

// READ ONE
async function readOneDocument(id) {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const documents = await collection.findOne({_id: id});
  console.log(documents);
  client.close();
}

// UPDATE
async function updateDocument(id, update) {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.updateOne({ _id: id }, { $set: update });
  console.log(`${result.modifiedCount} document(s) updated`);
  client.close();
}

// DELETE
async function deleteDocument(id) {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({ _id: id });
  console.log(`${result.deletedCount} document(s) deleted`);
  client.close();
}

// USAGE
async function main() {
  let insertedId = await createDocument();
  await readDocuments();
  await readOneDocument(insertedId);
  await updateDocument(insertedId, { age: 35 });
  await readDocuments();
  await deleteDocument(insertedId);
  await readDocuments();
}

main();
