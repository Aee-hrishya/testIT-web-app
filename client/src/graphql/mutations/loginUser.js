import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
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

export default LOGIN_USER;
