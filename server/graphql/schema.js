const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
  }

  type CreateUserResponse {
    success: Boolean!
    error: String
    user: User
    token: String
  }

  type LoginUserResponse {
    success: Boolean!
    error: String
    user: User
    token: String
  }

  type DashboardResponse {
    success: Boolean!
    error: String
    userDetails: User
  }

  type Query {
    dashboard: DashboardResponse!
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
      role: String!
    ): CreateUserResponse
    loginUser(username: String!, password: String!): LoginUserResponse
    # Add other mutation fields as needed
  }
`;

module.exports = typeDefs;
