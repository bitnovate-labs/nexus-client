import { gql } from "@apollo/client";

export const CREATE_PROJECT_UNIT_TYPE = gql`
  mutation CreateProjectUnitType($projectId: ID!, $name: String!) {
    createProjectUnitType(projectId: $projectId, name: $name) {
      id
      name
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

export const UPDATE_PROJECT_UNIT_TYPE = gql`
  mutation UpdateProjectUnitType($id: ID!, $name: String!) {
    updateProjectUnitType(id: $id, name: $name) {
      id
      name
      lastModifiedBy {
        name
      }
      lastModifiedAt
    }
  }
`;

export const DELETE_PROJECT_UNIT_TYPE = gql`
  mutation DeleteProjectUnitType($id: ID!) {
    deleteProjectUnitType(id: $id)
  }
`;
