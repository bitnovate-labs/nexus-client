import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $name: String!
    $date: String!
    $time: String
    $venue: String
    $speaker: String
    $topic: String
    $limitPax: Int
    $designation: String
    $branch: String
    $description: String
  ) {
    createEvent(
      name: $name
      date: $date
      time: $time
      venue: $venue
      speaker: $speaker
      topic: $topic
      limitPax: $limitPax
      designation: $designation
      branch: $branch
      description: $description
    ) {
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

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $name: String
    $date: String
    $time: String
    $venue: String
    $speaker: String
    $topic: String
    $limitPax: Int
    $designation: String
    $branch: String
    $description: String
  ) {
    updateEvent(
      id: $id
      name: $name
      date: $date
      time: $time
      venue: $venue
      speaker: $speaker
      topic: $topic
      limitPax: $limitPax
      designation: $designation
      branch: $branch
      description: $description
    ) {
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

export const DELETE_EVENTS = gql`
  mutation DeleteEvents($ids: [ID!]!) {
    deleteEvents(ids: $ids)
  }
`;
