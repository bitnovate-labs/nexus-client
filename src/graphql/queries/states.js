import { gql } from "@apollo/client";

export const GET_STATES = gql`
  query GetStates {
    states {
      id
      name
      code
      country
    }
  }
`;

export const GET_STATE = gql`
  query GetState($id: ID!) {
    state(id: $id) {
      id
      name
      code
      country
    }
  }
`;
