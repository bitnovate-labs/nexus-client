import { gql } from "@apollo/client";

export const UPLOAD_PROJECT_ATTACHMENT = gql`
  mutation UploadProjectAttachment(
    $projectId: ID!
    $file: Upload!
    $category: String
  ) {
    uploadProjectAttachment(
      projectId: $projectId
      file: $file
      category: $category
    ) {
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

export const DELETE_PROJECT_ATTACHMENT = gql`
  mutation DeleteProjectAttachment($id: ID!) {
    deleteProjectAttachment(id: $id)
  }
`;
