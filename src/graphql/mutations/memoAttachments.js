import { gql } from "@apollo/client";

export const UPLOAD_MEMO_ATTACHMENT = gql`
  mutation UploadMemoAttachment($memoId: ID!, $file: Upload!) {
    uploadMemoAttachment(memoId: $memoId, file: $file) {
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

export const DELETE_MEMO_ATTACHMENT = gql`
  mutation DeleteMemoAttachment($id: ID!) {
    deleteMemoAttachment(id: $id)
  }
`;
