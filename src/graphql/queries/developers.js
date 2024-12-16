import { gql } from "@apollo/client";

export const GET_DEVELOPERS = gql`
  query GetDevelopers {
    developers {
      id
      name
      registrationNo
      address
      contactPerson
      contactNo
    }
  }
`;

export const GET_DEVELOPER = gql`
  query GetDeveloper($id: ID!) {
    developer(id: $id) {
      id
      name
      registrationNo
      address
      contactPerson
      contactNo
    }
  }
`;
