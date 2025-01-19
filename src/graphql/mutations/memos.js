import { gql } from "@apollo/client";

export const CREATE_MEMO = gql`
  mutation CreateMemo(
    $date: String!
    $title: String!
    $validityFrom: String
    $validityTo: String
    $branch: String
    $designation: String
    $description: String
  ) {
    createMemo(
      date: $date
      title: $title
      validityFrom: $validityFrom
      validityTo: $validityTo
      branch: $branch
      designation: $designation
      description: $description
    ) {
      id
      date
      title
      validityFrom
      validityTo
      branch
      designation
      description
      createdAt
      createdBy
      lastModifiedAt
      lastModifiedBy
    }
  }
`;

export const UPDATE_MEMO = gql`
  mutation UpdateMemo(
    $id: ID!
    $date: String
    $title: String
    $validityFrom: String
    $validityTo: String
    $branch: String
    $designation: String
    $description: String
  ) {
    updateMemo(
      id: $id
      date: $date
      title: $title
      validityFrom: $validityFrom
      validityTo: $validityTo
      branch: $branch
      designation: $designation
      description: $description
    ) {
      id
      date
      title
      validityFrom
      validityTo
      branch
      designation
      description
      createdAt
      createdBy
      lastModifiedAt
      lastModifiedBy
    }
  }
`;

export const DELETE_MEMOS = gql`
  mutation DeleteMemos($ids: [ID!]!) {
    deleteMemos(ids: $ids)
  }
`;
