const { gql } = require("apollo-server");

const typeDefs = gql`
  type Coin {
    email: String!
    user_name: String!
    first_name: String!
    second_name: String!
    password: String!
  }
  input CreateCoin {
    email: String!
    user_name: String!
    first_name: String!
    second_name: String!
    password: String!
  }
  input Login {
    email: String!
    password: String!
  }

  type Query {
    Login(input: Login!): Coin
  }
  type Mutation {
    Register(input: CreateCoin): Coin
  }
`;

module.exports = { typeDefs };
