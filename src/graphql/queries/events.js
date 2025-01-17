import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      name
      date
      time
      venue
      speaker
      topic
      limitPax
      designation
      branch
      description
      createdAt
      createdBy
      lastModifiedAt
      lastModifiedBy
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      name
      date
      time
      venue
      speaker
      topic
      limitPax
      designation
      branch
      description
      createdAt
      createdBy
      lastModifiedAt
      lastModifiedBy
    }
  }
`;
