import { gql } from "@apollo/client";

// GET ALL PROJECTS
export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      company
      name
      developer {
        id
        name
        registrationNo
      }
      developerPayTax
      state {
        id
        name
      }
      description
      active
      createdBy {
        id
        name
      }
      createdAt
      lastModifiedBy {
        id
        name
      }
      lastModifiedAt
    }
  }
`;

// GET INDIVIDUAL PROJECT
export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      company
      name
      developer {
        id
        name
        registrationNo
      }
      developerPayTax
      state {
        id
        name
      }
      description
      active
      createdBy {
        id
        name
      }
      createdAt
      lastModifiedBy {
        id
        name
      }
      lastModifiedAt
      unitTypes {
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
      attachments {
        id
        filename
        mimeType
        size
        category
        createdBy {
          name
        }
        createdAt
      }
      schedules {
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
      commissionSchemes {
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
      agentCommissions {
        id
        salesCommissionType
        designation {
          id
          name
        }
        commissionType
        commissionValue
        overriding
        schedulePaymentType
        schedulePaymentValue
        createdBy {
          name
        }
        createdAt
        lastModifiedBy {
          name
        }
        lastModifiedAt
      }
      managerCommissions {
        id
        fromDate
        toDate
        commissionType
        agent {
          id
          name
          displayName
        }
        commissionValue
        overriding
        schedulePaymentType
        schedulePaymentValue
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
  }
`;

// PROJECT UNIT TYPES
export const GET_PROJECT_UNIT_TYPES = gql`
  query GetProjectUnitTypes($projectId: ID!) {
    projectUnitTypes(projectId: $projectId) {
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

// PROJECT ATTACHMENTS
export const GET_PROJECT_ATTACHMENTS = gql`
  query GetProjectAttachments($projectId: ID!) {
    projectAttachments(projectId: $projectId) {
      id
      filename
      mimeType
      size
      category
      createdBy {
        name
      }
      createdAt
    }
  }
`;

// PROJECT SCHEDULES
export const GET_PROJECT_SCHEDULES = gql`
  query GetProjectSchedules($projectId: ID!) {
    projectSchedules(projectId: $projectId) {
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
