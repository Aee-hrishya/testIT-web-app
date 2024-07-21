import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $role: String!) {
    createUser(username: $username, password: $password, role: $role) {
      success
      error
      user {
        id
        username
        role
      }
      token
    }
  }
`;

export default CREATE_USER;
