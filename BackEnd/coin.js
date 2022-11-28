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
  type Rating {
    rate: Float
    count: Float
  }
  type Object {
    id: Float
    title: String
    price: Float
    description: String
    category: String
    image: String
    rating: Rating
  }
  type Query {
    Login(input: Login!): Coin
  }
  type Query {
    Products: [Object]
  }
  type Mutation {
    Register(input: CreateCoin): Coin
  }
`;

module.exports = { typeDefs };
