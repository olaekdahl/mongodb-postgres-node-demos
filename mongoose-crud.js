const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/demodb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        main();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define a schema for the document
const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Define a model based on the schema
const Person = mongoose.model('Person', personSchema);


// CREATE
async function createDocument() {
    const person = new Person({ name: 'John Doe', age: 30 });
    try {
        const savedPerson = await person.save();
        console.log('New document created:', savedPerson);
        return savedPerson._id; // Return the inserted document's ID
    } catch (error) {
        console.error('Error creating document:', error);
        return null;
    }
}

// READ
async function readDocuments() {
    try {
        const documents = await Person.find();
        console.log('Documents:', documents);
    } catch (error) {
        console.error('Error reading documents:', error);
    }
}

// UPDATE
async function updateDocument(id, update) {
    try {
        const updatedPerson = await Person.findByIdAndUpdate(id, update, { new: true });
        console.log('Document updated:', updatedPerson);
    } catch (error) {
        console.error('Error updating document:', error);
    }
}

// DELETE
async function deleteDocument(id) {
    try {
        const deletedPerson = await Person.findByIdAndRemove(id);
        console.log('Document deleted:', deletedPerson);
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}

// DELETE ALL DOCUMENTS
async function deleteAllDocuments() {
    try {
        const result = await Person.deleteMany();
        console.log(`${result.deletedCount} document(s) deleted`);
    } catch (error) {
        console.error('Error deleting documents:', error);
    }
}

// USAGE
async function main() {
    let id = await createDocument();
    await readDocuments();
    await updateDocument(id, { age: 35 });
    await readDocuments();
    await deleteDocument(id);
    await readDocuments();

    // await deleteAllDocuments();

    process.exit();
}
