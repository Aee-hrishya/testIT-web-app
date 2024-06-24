const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Query {
    users: [User!]!
    # Add other query fields as needed
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    # Add other mutation fields as needed
  }
`;

module.exports = typeDefs;
