import { gql } from "@apollo/client";

export const GET_EVENT_ATTACHMENTS = gql`
  query GetEventAttachments($eventId: ID!) {
    eventAttachments(eventId: $eventId) {
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
