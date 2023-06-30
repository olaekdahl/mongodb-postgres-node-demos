const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Book = require("./Book");

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/graphql_example', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema
const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    book(id: ID!): Book
    books: [Book]
  }

  type Mutation {
    createBook(title: String!, author: String!): Book
  }
`);

// Define resolvers
const root = {
  book: ({ id }) => Book.findById(id),
  books: () => Book.find(),
  createBook: ({ title, author }) => {
    const book = new Book({ title, author });
    return book.save();
  }
};

// Create an Express server
const app = express();

// Create a GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // Enable GraphiQL GUI for testing
}));

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
