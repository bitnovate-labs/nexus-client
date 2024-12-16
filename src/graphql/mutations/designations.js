import { gql } from "@apollo/client";

export const CREATE_DESIGNATION = gql`
  mutation CreateDesignation($name: String!, $rank: Int!, $active: Boolean!) {
    createDesignation(name: $name, rank: $rank, active: $active) {
      id
      name
      rank
      active
    }
  }
`;

export const UPDATE_DESIGNATION = gql`
  mutation UpdateDesignation(
    $id: ID!
    $name: String
    $rank: Int
    $active: Boolean
  ) {
    updateDesignation(id: $id, name: $name, rank: $rank, active: $active) {
      id
      name
      rank
      active
    }
  }
`;

export const DELETE_DESIGNATION = gql`
  mutation DeleteDesignation($ids: [ID!]!) {
    deleteDesignation(ids: $ids)
  }
`;
