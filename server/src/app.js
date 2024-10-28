const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const dbConnect = require("./config/db");
const typeDefs = require("./api/graphql/typeDefs");
const resolvers = require("./api/graphql/resolvers");
const ENV = require("./config/env");

const app = express();

// Database connection
dbConnect();



// Apollo GraphQL server setup
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  console.log(`GraphQL endpoint ready at /graphql`);
}

startServer();

module.exports = app;
