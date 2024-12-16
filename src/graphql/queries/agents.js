import { gql } from "@apollo/client";

export const GET_AGENTS = gql`
  query GetAgents {
    agents {
      id
      name
      displayName
      nricPassport
      email
      mobile
      address
      payeeName
      payeeNric
      payeeNricType
      bank
      bankAccountNo
      swiftCode
      renNo
      renLicense
      renExpiredDate
      branch
      leader
      recruiter
      designation
      commissionPercentage
      joinDate
      resignDate
      incomeTaxNo
      withholdingTax
      leaderboard
      active
      remark
      avatarUrl
    }
  }
`;

export const GET_AGENT = gql`
  query GetAgent($id: ID!) {
    agent(id: $id) {
      id
      name
      displayName
      nricPassport
      email
      mobile
      address
      payeeName
      payeeNric
      payeeNricType
      bank
      bankAccountNo
      swiftCode
      renNo
      renLicense
      renExpiredDate
      branch
      leader
      recruiter
      designation
      commissionPercentage
      joinDate
      resignDate
      incomeTaxNo
      withholdingTax
      leaderboard
      active
      remark
      avatarUrl
    }
  }
`;
