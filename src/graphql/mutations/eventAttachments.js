import { gql } from "@apollo/client";

export const UPLOAD_EVENT_ATTACHMENT = gql`
  mutation UploadEventAttachment($eventId: ID!, $file: Upload!) {
    uploadEventAttachment(eventId: $eventId, file: $file) {
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

export const DELETE_EVENT_ATTACHMENT = gql`
  mutation DeleteEventAttachment($id: ID!) {
    deleteEventAttachment(id: $id)
  }
`;
