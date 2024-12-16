import { gql } from "@apollo/client";

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      id
      name
      username
      email
      avatarUrl
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $username: String!
    $password: String!
    $email: String!
    $mobile: String
    $role: String
    $active: Boolean!
  ) {
    createUser(
      name: $name
      username: $username
      password: $password
      email: $email
      mobile: $mobile
      role: $role
      active: $active
    ) {
      id
      name
      username
      email
      mobile
      role
      active
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $username: String
    $email: String
    $mobile: String
    $role: String
    $active: Boolean
  ) {
    updateUser(
      id: $id
      name: $name
      username: $username
      email: $email
      mobile: $mobile
      role: $role
      active: $active
    ) {
      id
      name
      username
      email
      mobile
      role
      active
    }
  }
`;

export const DELETE_USERS = gql`
  mutation DeleteUsers($ids: [ID!]!) {
    deleteUsers(ids: $ids)
  }
`;
