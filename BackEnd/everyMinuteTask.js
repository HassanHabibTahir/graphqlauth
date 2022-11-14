const cron = require("node-cron");
const axios = require("axios");
const {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
} = require("@apollo/client");

const fetch = require("cross-fetch");

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.PRODUCTION_GRAPHQL_URL, fetch }),
  cache: new InMemoryCache(),
});

const runEveryMinute = (link, Curr, link2, Curr2, pair) => {
  cron.schedule("* * * * *", async () => {
    const data = await axios.get(link).catch((err) => console.log(err));
    const data2 = await axios.get(link2).catch((err) => console.log(err));
    if (pair === 1) {
      client.mutate({
        mutation: gql`
          mutation Mutation($input: CreateCoin!) {
            createFirstPairCoin(input: $input) {
              name
              price
              name2
              price2
            }
          }
        `,
        variables: {
          input: {
            name: Curr,
            price: Number(data.data.USD),
            name2: Curr2,
            price2: Number(data2.data.PKR),
          },
        },
      });
    } else if (pair === 2) {
      client.mutate({
        mutation: gql`
          mutation Mutation($input: CreateCoin!) {
            createSecondPairCoin(input: $input) {
              name
              price
              name2
              price2
            }
          }
        `,
        variables: {
          input: {
            name: Curr,
            price: Number(data.data.JPY),
            name2: Curr2,
            price2: Number(data2.data.GBP),
          },
        },
      });
    }

    console.log("running a task every minute");
  });
};

module.exports = { runEveryMinute };
