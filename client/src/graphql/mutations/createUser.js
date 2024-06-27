import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      success
      error
      user {
        id
        username
      }
    }
  }
`;

export default CREATE_USER;
