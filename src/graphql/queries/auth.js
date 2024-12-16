import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      name
      email
      mobile
      role
      avatarUrl
      agent {
        leader
        recruiter
      }
    }
  }
`;

export const GET_TOKEN_INFO = gql`
  query GetTokenInfo {
    tokenInfo {
      expiresIn
      warningTime
    }
  }
`;
