import { gql } from "apollo-server-core";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type mutation {
    createUser(username: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
