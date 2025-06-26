// MongoDB CRUD Demo with Node.js
import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'demodb';
const collectionName = 'crud';

// CREATE: Insert a new document into the collection
async function createDocument(doc) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(doc);
    console.log(`New document created with _id: ${result.insertedId}`);
    return result.insertedId;
  } catch (err) {
    console.error('Create failed:', err);
  } finally {
    await client.close();
  }
}

// READ: Get all documents from the collection
async function readDocuments() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find().toArray();
    console.log('All documents:', documents);
    return documents;
  } catch (err) {
    console.error('Read failed:', err);
  } finally {
    await client.close();
  }
}

// READ ONE: Get a single document by its _id
async function readOneDocument(id) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const document = await collection.findOne({ _id: new ObjectId(id) });
    console.log('Single document:', document);
    return document;
  } catch (err) {
    console.error('Read one failed:', err);
  } finally {
    await client.close();
  }
}

// UPDATE: Update a document by its _id
async function updateDocument(id, update) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    console.log(`${result.modifiedCount} document(s) updated`);
    return result.modifiedCount;
  } catch (err) {
    console.error('Update failed:', err);
  } finally {
    await client.close();
  }
}

// DELETE: Delete a document by its _id
async function deleteDocument(id) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(`${result.deletedCount} document(s) deleted`);
    return result.deletedCount;
  } catch (err) {
    console.error('Delete failed:', err);
  } finally {
    await client.close();
  }
}

// USAGE EXAMPLE
async function main() {
  // Create
  const insertedId = await createDocument({ name: 'John Doe', age: 30 });
  // Read all
  await readDocuments();
  // Read one
  await readOneDocument(insertedId);
  // Update
  await updateDocument(insertedId, { age: 35 });
  // Read all again
  await readDocuments();
  // Delete
  await deleteDocument(insertedId);
  // Read all again
  await readDocuments();
}

main();
