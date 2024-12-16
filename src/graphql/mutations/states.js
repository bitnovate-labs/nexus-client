import { gql } from "@apollo/client";

// CREATE
export const CREATE_STATE = gql`
  mutation CreateState($name: String!, $code: String!, $country: String!) {
    createState(name: $name, code: $code, country: $country) {
      id
      name
      code
      country
    }
  }
`;

// UPDATE
export const UPDATE_STATE = gql`
  mutation UpdateState(
    $id: ID!
    $name: String
    $code: String
    $country: String
  ) {
    updateState(id: $id, name: $name, code: $code, country: $country) {
      id
      name
      code
      country
    }
  }
`;

// DELETE
export const DELETE_STATES = gql`
  mutation DeleteStates($ids: [ID!]!) {
    deleteStates(ids: $ids)
  }
`;
