import { gql } from "@apollo/client";

export const GET_USER_ROLES = gql`
  query GetUserRoles {
    userRoles {
      id
      code
      name
      active
    }
  }
`;

export const GET_USER_ROLE = gql`
  query GetUserRole($id: ID!) {
    userRole(id: $id) {
      id
      code
      name
      active
    }
  }
`;
