import { gql } from "@apollo/client";

export const CREATE_USER_ROLE = gql`
  mutation CreateUserRole($code: String!, $name: String!, $active: Boolean!) {
    createUserRole(code: $code, name: $name, active: $active) {
      id
      code
      name
      active
    }
  }
`;

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole(
    $id: ID!
    $code: String
    $name: String
    $active: Boolean
  ) {
    updateUserRole(id: $id, code: $code, name: $name, active: $active) {
      id
      code
      name
      active
    }
  }
`;

export const DELETE_USER_ROLES = gql`
  mutation DeleteUserRoles($ids: [ID!]!) {
    deleteUserRoles(ids: $ids)
  }
`;
