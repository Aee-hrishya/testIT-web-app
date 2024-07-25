import { gql } from "@apollo/client";

const GET_DASHBOARD_DETAILS = gql`
  query GetDashboardDetails {
    dashboard {
      success
      error
      userDetails {
        id
        username
        role
      }
    }
  }
`;

export default GET_DASHBOARD_DETAILS;
