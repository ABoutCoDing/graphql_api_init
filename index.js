const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const {MongoClient} = require('mongodb');
const {readFileSync} = require('fs');

const resolvers = require('./resolvers');
const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8');
require('dotenv').config();

const start = async () => {
  const app = express();
 
  const MONGO_DB = process.env.DB_HOST;

  try {
    const client = await MongoClient.connect(MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true});
  } catch (error) {
    console.log(`
    
      Mongo DB Host not found!
      please add DB_HOST environment variable to .env file

      exiting...
       
    `);
    process.exit(1);
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });

  app.listen({port: 4000}, () =>
    console.log(`GraphQL Server running at http://localhost:4000${server.graphqlPath}`)
  )
};
start();