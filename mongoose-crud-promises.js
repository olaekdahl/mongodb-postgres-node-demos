const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        main()
            .then(() => process.exit())
            .catch((error) => {
                console.error('Error in main function:', error);
                process.exit(1);
            });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

// Define a schema for the document
const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Define a model based on the schema
const Person = mongoose.model('Person', personSchema);

// CREATE
function createDocument() {
    const person = new Person({ name: 'John Doe', age: 30 });
    return person.save()
        .then((savedPerson) => {
            console.log('New document created:', savedPerson);
            return savedPerson._id; // Return the inserted document's ID
        })
        .catch((error) => {
            console.error('Error creating document:', error);
            throw error;
        });
}

// READ
function readDocuments() {
    return Person.find()
        .then((documents) => {
            console.log('Documents:', documents);
            return documents;
        })
        .catch((error) => {
            console.error('Error reading documents:', error);
            throw error;
        });
}

// UPDATE
function updateDocument(id, update) {
    return Person.findByIdAndUpdate(id, update, { new: true })
        .then((updatedPerson) => {
            console.log('Document updated:', updatedPerson);
            return updatedPerson;
        })
        .catch((error) => {
            console.error('Error updating document:', error);
            throw error;
        });
}

// DELETE
function deleteDocument(id) {
    return Person.findByIdAndRemove(id)
        .then((deletedPerson) => {
            console.log('Document deleted:', deletedPerson);
            return deletedPerson;
        })
        .catch((error) => {
            console.error('Error deleting document:', error);
            throw error;
        });
}

// DELETE ALL DOCUMENTS
function deleteAllDocuments() {
    return Person.deleteMany()
        .then((result) => {
            console.log(`${result.deletedCount} document(s) deleted`);
            return result.deletedCount;
        })
        .catch((error) => {
            console.error('Error deleting documents:', error);
            throw error;
        });
}

// USAGE
function main() {
    return createDocument()
        .then(() => readDocuments())
        .then((insertedId) => updateDocument(insertedId, { age: 35 }))
        .then(() => readDocuments())
        .then((insertedId) => deleteDocument(insertedId))
        .then(() => readDocuments());
        // .then(() => deleteAllDocuments())
        // .then(() => readDocuments());
}