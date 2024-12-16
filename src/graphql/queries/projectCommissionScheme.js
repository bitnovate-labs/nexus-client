import { gql } from "@apollo/client";

// PROJECT COMMISSION SCHEMES
export const GET_PROJECT_COMMISSION_SCHEMES = gql`
  query GetProjectCommissionSchemes($projectId: ID!) {
    projectCommissionSchemes(projectId: $projectId) {
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
