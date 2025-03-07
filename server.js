// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ObjectId } = require('mongodb');

import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const port = 3000; // You can change the port as needed
const url = 'mongodb://localhost:27017';
const dbName = 'demodb';
const collectionName = 'crud';

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// CREATE
app.post('/create', async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    console.log(`New document created with _id: ${result.insertedId}`);
    client.close();
    res.status(201).json({ _id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// READ
app.get('/read', async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find().toArray();
    console.log(documents);
    client.close();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// READ ONE
app.get('/read/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const document = await collection.findOne({ _id: new ObjectId(id) });
    console.log(document);
    client.close();
    if (document) {
      res.json(document);
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE
app.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne({ _id: id }, { $set: update });
    console.log(`${result.modifiedCount} document(s) updated`);
    client.close();
    if (result.modifiedCount > 0) {
      res.json({ message: `${result.modifiedCount} document(s) updated` });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: id });
    console.log(`${result.deletedCount} document(s) deleted`);
    client.close();
    if (result.deletedCount > 0) {
      res.json({ message: `${result.deletedCount} document(s) deleted` });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});