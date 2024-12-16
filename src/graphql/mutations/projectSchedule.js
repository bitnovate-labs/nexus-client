import { gql } from "@apollo/client";

export const CREATE_PROJECT_SCHEDULE = gql`
  mutation CreateProjectSchedule(
    $projectId: ID!
    $name: String!
    $sequence: Int!
  ) {
    createProjectSchedule(
      projectId: $projectId
      name: $name
      sequence: $sequence
    ) {
      id
      name
      sequence
      createdBy {
        name
      }
      createdAt
      lastModifiedBy {
        name
      }
      lastModifiedAt
    }
  }
`;

export const UPDATE_PROJECT_SCHEDULE = gql`
  mutation UpdateProjectSchedule($id: ID!, $name: String, $sequence: Int) {
    updateProjectSchedule(id: $id, name: $name, sequence: $sequence) {
      id
      name
      sequence
      lastModifiedBy {
        name
      }
      lastModifiedAt
    }
  }
`;

export const DELETE_PROJECT_SCHEDULE = gql`
  mutation DeleteProjectSchedule($id: ID!) {
    deleteProjectSchedule(id: $id)
  }
`;
