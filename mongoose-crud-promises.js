import mongoose from 'mongoose';

// Define a schema for the document
const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// Define a model based on the schema
const Person = mongoose.model('Person', personSchema);

// CREATE: Insert a new document (returns a Promise)
function createDocument(data) {
  const person = new Person(data);
  return person.save()
    .then(savedPerson => {
      console.log('New document created:', savedPerson);
      return savedPerson._id;
    })
    .catch(error => {
      console.error('Error creating document:', error);
      throw error;
    });
}

// READ: Get all documents (returns a Promise)
function readDocuments() {
  return Person.find()
    .then(documents => {
      console.log('Documents:', documents);
      return documents;
    })
    .catch(error => {
      console.error('Error reading documents:', error);
      throw error;
    });
}

// READ ONE: Get a single document by ID (returns a Promise)
function readOneDocument(id) {
  return Person.findById(id)
    .then(document => {
      console.log('Single document:', document);
      return document;
    })
    .catch(error => {
      console.error('Error reading single document:', error);
      throw error;
    });
}

// UPDATE: Update a document by ID (returns a Promise)
function updateDocument(id, update) {
  return Person.findByIdAndUpdate(id, update, { new: true })
    .then(updatedPerson => {
      console.log('Document updated:', updatedPerson);
      return updatedPerson;
    })
    .catch(error => {
      console.error('Error updating document:', error);
      throw error;
    });
}

// DELETE: Delete a document by ID (returns a Promise)
function deleteDocument(id) {
  return Person.findByIdAndRemove(id)
    .then(deletedPerson => {
      console.log('Document deleted:', deletedPerson);
      return deletedPerson;
    })
    .catch(error => {
      console.error('Error deleting document:', error);
      throw error;
    });
}

// DELETE ALL DOCUMENTS: For demo cleanup (returns a Promise)
function deleteAllDocuments() {
  return Person.deleteMany()
    .then(result => {
      console.log(`${result.deletedCount} document(s) deleted`);
      return result.deletedCount;
    })
    .catch(error => {
      console.error('Error deleting documents:', error);
      throw error;
    });
}

// USAGE EXAMPLE: Chain Promises for CRUD demo
function main() {
  let insertedId;
  return createDocument({ name: 'John Doe', age: 30 })
    .then(id => {
      insertedId = id;
      return readDocuments();
    })
    .then(() => readOneDocument(insertedId))
    .then(() => updateDocument(insertedId, { age: 35 }))
    .then(() => readDocuments())
    .then(() => deleteDocument(insertedId))
    .then(() => readDocuments())
    // .then(() => deleteAllDocuments())
    // .then(() => readDocuments())
    ;
}

// Connect to MongoDB and run main using Promises
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return main();
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Connection closed');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error:', error);
    mongoose.connection.close().then(() => process.exit(1));
  });