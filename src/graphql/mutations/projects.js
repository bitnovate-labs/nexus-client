import { gql } from "@apollo/client";

// CREATE PROJECT
export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $company: String!
    $name: String!
    $developerId: ID!
    $developerPayTax: Boolean
    $stateId: ID!
    $description: String
    $active: Boolean!
  ) {
    createProject(
      company: $company
      name: $name
      developerId: $developerId
      developerPayTax: $developerPayTax
      stateId: $stateId
      description: $description
      active: $active
    ) {
      id
      company
      name
      developer {
        id
        name
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

// UPDATE PROJECT
export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $company: String
    $name: String
    $developerId: ID
    $developerPayTax: Boolean
    $stateId: ID
    $description: String
    $active: Boolean
  ) {
    updateProject(
      id: $id
      company: $company
      name: $name
      developerId: $developerId
      developerPayTax: $developerPayTax
      stateId: $stateId
      description: $description
      active: $active
    ) {
      id
      company
      name
      developer {
        id
        name
      }
      developerPayTax
      state {
        id
        name
      }
      description
      active
      lastModifiedBy {
        id
        name
      }
      lastModifiedAt
    }
  }
`;

// DELETE PROJECT
export const DELETE_PROJECTS = gql`
  mutation DeleteProjects($ids: [ID!]!) {
    deleteProjects(ids: $ids)
  }
`;

// CREATE AGENT COMMISSION
export const CREATE_AGENT_COMMISSION = gql`
  mutation CreateAgentCommission(
    $projectId: ID!
    $commissionSchemeId: ID!
    $salesCommissionType: String!
    $designationId: ID
    $commissionType: String!
    $commissionValue: Int!
    $overriding: Boolean!
    $schedulePaymentType: String
    $schedulePaymentValue: Int
  ) {
    createAgentCommission(
      projectId: $projectId
      commissionSchemeId: $commissionSchemeId
      salesCommissionType: $salesCommissionType
      designationId: $designationId
      commissionType: $commissionType
      commissionValue: $commissionValue
      overriding: $overriding
      schedulePaymentType: $schedulePaymentType
      schedulePaymentValue: $schedulePaymentValue
    ) {
      id
      commissionScheme {
        id
      }
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
        id
        name
      }
      createdAt
    }
  }
`;

// CREATE PROJECT MANAGER COMMISSION
export const CREATE_PROJECT_MANAGER_COMMISSION = gql`
  mutation CreateProjectManagerCommission(
    $projectId: ID!
    $commissionSchemeId: ID!
    $fromDate: String!
    $toDate: String!
    $commissionType: String!
    $agentId: ID!
    $commissionValue: Int!
    $overriding: Boolean!
    $schedulePaymentType: String
    $schedulePaymentValue: Int
  ) {
    createProjectManagerCommission(
      projectId: $projectId
      commissionSchemeId: $commissionSchemeId
      fromDate: $fromDate
      toDate: $toDate
      commissionType: $commissionType
      agentId: $agentId
      commissionValue: $commissionValue
      overriding: $overriding
      schedulePaymentType: $schedulePaymentType
      schedulePaymentValue: $schedulePaymentValue
    ) {
      id
      commissionScheme {
        id
      }
      fromDate
      toDate
      commissionType
      agent {
        id
        name
      }
      commissionValue
      overriding
      schedulePaymentType
      schedulePaymentValue
      createdBy {
        id
        name
      }
      createdAt
    }
  }
`;

// CREATE PROJECT PACKAGE
export const CREATE_PROJECT_PACKAGE = gql`
  mutation CreateProjectPackage(
    $projectId: ID!
    $packageName: String!
    $dateFrom: String!
    $dateTo: String!
    $deductFrom: String!
    $amountType: String!
    $amountValue: Int!
    $deductType: String!
    $displaySequence: Int!
  ) {
    createProjectPackage(
      projectId: $projectId
      packageName: $packageName
      dateFrom: $dateFrom
      dateTo: $dateTo
      deductFrom: $deductFrom
      amountType: $amountType
      amountValue: $amountValue
      deductType: $deductType
      displaySequence: $displaySequence
    ) {
      id
      packageName
      dateFrom
      dateTo
      deductFrom
      amountType
      amountValue
      deductType
      displaySequence
      createdBy {
        id
        name
      }
      createdAt
    }
  }
`;
