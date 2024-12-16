import { gql } from "@apollo/client";

export const GET_DESIGNATIONS = gql`
  query GetDesignations {
    designations {
      id
      name
      rank
      active
    }
  }
`;

export const GET_DESIGNATION = gql`
  query GetDesignation($id: ID!) {
    designation(id: $id) {
      id
      name
      rank
      active
    }
  }
`;
