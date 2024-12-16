import { gql } from "@apollo/client";

export const GET_BRANCHES = gql`
  query GetBranches {
    branches {
      id
      name
      maxAgents
      active
    }
  }
`;

export const GET_BRANCH = gql`
  query GetBranch($id: ID!) {
    branch(id: $id) {
      id
      name
      maxAgents
      active
    }
  }
`;
