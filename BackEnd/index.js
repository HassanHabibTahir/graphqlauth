import connectDB from "./connectMongo.js";
import { ApolloServer } from "apollo-server-express";

import * as path from "path";
import * as fs from "fs";
import typeDefs from "./coin.js";
import resolvers from "./resolvers.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import express from "express";
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   uploads: false,
// });
// server.listen().then(({ url }) => {
//   connectDB();
//   console.log(`your app is runnung on ${url}`);
// });
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  app.use(express.static(path.join(__dirname, "./upload")));
  await new Promise((r) => {
    connectDB();
    app.listen({ port: 4000 }, r);
  });
  console.log(
    `🚀 Server ready at     http://localhost:4000${server.graphqlPath}`
  );
}
startServer();
