import { gql } from "@apollo/client";

// CREATE PROJECT COMMISSION SCHEME
export const CREATE_PROJECT_COMMISSION_SCHEME = gql`
  mutation CreateProjectCommissionScheme(
    $projectId: ID!
    $unitTypeId: ID
    $fromDate: String!
    $toDate: String!
    $minUnit: Int!
    $maxUnit: Int!
    $commissionType: String!
    $commissionValue: Int!
  ) {
    createProjectCommissionScheme(
      projectId: $projectId
      unitTypeId: $unitTypeId
      fromDate: $fromDate
      toDate: $toDate
      minUnit: $minUnit
      maxUnit: $maxUnit
      commissionType: $commissionType
      commissionValue: $commissionValue
    ) {
      id
      unitType {
        id
        name
      }
      fromDate
      toDate
      minUnit
      maxUnit
      commissionType
      commissionValue
      createdBy {
        id
        name
      }
      createdAt
    }
  }
`;

// UPDATE
export const UPDATE_PROJECT_COMMISSION_SCHEME = gql`
  mutation UpdateProjectCommissionScheme(
    $id: ID!
    $projectId: ID!
    $unitTypeId: ID!
    $fromDate: String!
    $toDate: String!
    $minUnit: Int!
    $maxUnit: Int!
    $commissionType: String!
    $commissionValue: Int!
  ) {
    updateProjectCommissionScheme(
      id: $id
      projectId: $projectId
      unitTypeId: $unitTypeId
      fromDate: $fromDate
      toDate: $toDate
      minUnit: $minUnit
      maxUnit: $maxUnit
      commissionType: $commissionType
      commissionValue: $commissionValue
    ) {
      id
      projectId
      unitType {
        id
        name
      }
      fromDate
      toDate
      minUnit
      maxUnit
      commissionType
      commissionValue
      createdBy {
        id
        name
      }
      createdAt
    }
  }
`;

// DELETE
export const DELETE_PROJECT_COMMISSION_SCHEME = gql`
  mutation DeleteProjectCommissionSchemes($id: ID!) {
    deleteProjectCommissionScheme(id: $id)
  }
`;
