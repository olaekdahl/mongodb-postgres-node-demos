import mongoose from 'mongoose';

// Connect to MongoDB
dbConnectAndRun();

// Define a schema for the document
const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Define a model based on the schema
const Person = mongoose.model('Person', personSchema);

// CREATE: Insert a new document (accepts data as parameter)
async function createDocument(data) {
    try {
        const person = new Person(data);
        const savedPerson = await person.save();
        console.log('New document created:', savedPerson);
        return savedPerson._id;
    } catch (error) {
        console.error('Error creating document:', error);
        return null;
    }
}

// READ: Get all documents
async function readDocuments() {
    try {
        const documents = await Person.find();
        console.log('Documents:', documents);
        return documents;
    } catch (error) {
        console.error('Error reading documents:', error);
        return [];
    }
}

// READ ONE: Get a single document by ID
async function readOneDocument(id) {
    try {
        const document = await Person.findById(id);
        console.log('Single document:', document);
        return document;
    } catch (error) {
        console.error('Error reading single document:', error);
        return null;
    }
}

// UPDATE: Update a document by ID
async function updateDocument(id, update) {
    try {
        const updatedPerson = await Person.findByIdAndUpdate(id, update, { new: true });
        console.log('Document updated:', updatedPerson);
        return updatedPerson;
    } catch (error) {
        console.error('Error updating document:', error);
        return null;
    }
}

// DELETE: Delete a document by ID
async function deleteDocument(id) {
    try {
        const deletedPerson = await Person.findByIdAndRemove(id);
        console.log('Document deleted:', deletedPerson);
        return deletedPerson;
    } catch (error) {
        console.error('Error deleting document:', error);
        return null;
    }
}

// DELETE ALL DOCUMENTS: For demo cleanup (commented out)
// async function deleteAllDocuments() {
//     try {
//         const result = await Person.deleteMany();
//         console.log(`${result.deletedCount} document(s) deleted`);
//         return result.deletedCount;
//     } catch (error) {
//         console.error('Error deleting documents:', error);
//         return 0;
//     }
// }

// USAGE EXAMPLE
async function main() {
    // Create
    const id = await createDocument({ name: 'John Doe', age: 30 });
    // Read all
    await readDocuments();
    // Read one
    await readOneDocument(id);
    // Update
    await updateDocument(id, { age: 35 });
    // Read all again
    await readDocuments();
    // Delete
    await deleteDocument(id);
    // Read all again
    await readDocuments();
    // Optionally, clean up all documents
    // await deleteAllDocuments();
    // await readDocuments();
    await mongoose.connection.close();
    console.log('Connection closed');
    process.exit();
}

// Connect to MongoDB and run main
async function dbConnectAndRun() {
    try {
        await mongoose.connect('mongodb://localhost:27017/demodb', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        await main();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
