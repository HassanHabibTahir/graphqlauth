const connectDB = require("./connectMongo");
const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./coin");
const { resolvers } = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.listen().then(({ url }) => {
  connectDB();
  console.log(`your app is runnung on ${url}`);
});
