import { gql } from "@apollo/client";

export const GET_MEMO_ATTACHMENTS = gql`
  query GetMemoAttachments($memoId: ID!) {
    memoAttachments(memoId: $memoId) {
      id
      filename
      contentType
      size
      url
      createdAt
      createdBy
    }
  }
`;
