import { gql } from "@apollo/client";

// CREATE
export const CREATE_DEVELOPER = gql`
  mutation CreateDeveloper(
    $name: String!
    $registrationNo: String
    $address: String
    $contactPerson: String
    $contactNo: String
  ) {
    createDeveloper(
      name: $name
      registrationNo: $registrationNo
      address: $address
      contactPerson: $contactPerson
      contactNo: $contactNo
    ) {
      id
      name
      registrationNo
      address
      contactPerson
      contactNo
    }
  }
`;

// UPDATE
export const UPDATE_DEVELOPER = gql`
  mutation UpdateDeveloper(
    $id: ID!
    $name: String
    $registrationNo: String
    $address: String
    $contactPerson: String
    $contactNo: String
  ) {
    updateDeveloper(
      id: $id
      name: $name
      registrationNo: $registrationNo
      address: $address
      contactPerson: $contactPerson
      contactNo: $contactNo
    ) {
      id
      name
      registrationNo
      address
      contactPerson
      contactNo
    }
  }
`;

// DELETE
export const DELETE_DEVELOPERS = gql`
  mutation DeleteDevelopers($ids: [ID!]!) {
    deleteDevelopers(ids: $ids)
  }
`;
