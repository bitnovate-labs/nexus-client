import { gql } from "@apollo/client";

export const GET_MEMOS = gql`
  query GetMemos {
    memos {
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

export const GET_MEMO = gql`
  query GetMemo($id: ID!) {
    memo(id: $id) {
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
