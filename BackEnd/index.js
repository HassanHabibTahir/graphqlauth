const connectDB = require("./connectMongo");
// const { runEveryMinute } = require("./everyMinuteTask");
const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./coin");
const { resolvers } = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.listen().then(({ url }) => {
  // runEveryMinute(process.env.USD, "USD", process.env.PKR, "PKR", 1);
  // runEveryMinute(process.env.JPY, "JPY", process.env.GBP, "GBP", 2);

  connectDB();
  console.log(`your app is runnung on ${url}`);
});
