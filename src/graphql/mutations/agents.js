import { gql } from "@apollo/client";

export const UPLOAD_AGENT_AVATAR = gql`
  mutation UploadAgentAvatar($id: ID!, $file: Upload!) {
    uploadAgentAvatar(id: $id, file: $file) {
      id
      name
      avatarUrl
    }
  }
`;

export const CREATE_AGENT = gql`
  mutation CreateAgent(
    $name: String!
    $displayName: String
    $nricPassport: String
    $email: String
    $mobile: String
    $address: String
    $payeeName: String
    $payeeNric: String
    $payeeNricType: String
    $bank: String
    $bankAccountNo: String
    $swiftCode: String
    $renNo: String
    $renLicense: String
    $renExpiredDate: String
    $branch: String
    $leader: String
    $recruiter: String
    $designation: String
    $commissionPercentage: Float
    $joinDate: String
    $resignDate: String
    $incomeTaxNo: String
    $withholdingTax: Boolean
    $leaderboard: Boolean
    $active: Boolean
    $remark: String
  ) {
    createAgent(
      name: $name
      displayName: $displayName
      nricPassport: $nricPassport
      email: $email
      mobile: $mobile
      address: $address
      payeeName: $payeeName
      payeeNric: $payeeNric
      payeeNricType: $payeeNricType
      bank: $bank
      bankAccountNo: $bankAccountNo
      swiftCode: $swiftCode
      renNo: $renNo
      renLicense: $renLicense
      renExpiredDate: $renExpiredDate
      branch: $branch
      leader: $leader
      recruiter: $recruiter
      designation: $designation
      commissionPercentage: $commissionPercentage
      joinDate: $joinDate
      resignDate: $resignDate
      incomeTaxNo: $incomeTaxNo
      withholdingTax: $withholdingTax
      leaderboard: $leaderboard
      active: $active
      remark: $remark
    ) {
      id
      name
      displayName
      email
      mobile
      branch
      leader
      designation
      active
      avatarUrl
    }
  }
`;

export const UPDATE_AGENT = gql`
  mutation UpdateAgent(
    $id: ID!
    $name: String
    $displayName: String
    $nricPassport: String
    $email: String
    $mobile: String
    $address: String
    $payeeName: String
    $payeeNric: String
    $payeeNricType: String
    $bank: String
    $bankAccountNo: String
    $swiftCode: String
    $renNo: String
    $renLicense: String
    $renExpiredDate: String
    $branch: String
    $leader: String
    $recruiter: String
    $designation: String
    $commissionPercentage: Float
    $joinDate: String
    $resignDate: String
    $incomeTaxNo: String
    $withholdingTax: Boolean
    $leaderboard: Boolean
    $active: Boolean
    $remark: String
  ) {
    updateAgent(
      id: $id
      name: $name
      displayName: $displayName
      nricPassport: $nricPassport
      email: $email
      mobile: $mobile
      address: $address
      payeeName: $payeeName
      payeeNric: $payeeNric
      payeeNricType: $payeeNricType
      bank: $bank
      bankAccountNo: $bankAccountNo
      swiftCode: $swiftCode
      renNo: $renNo
      renLicense: $renLicense
      renExpiredDate: $renExpiredDate
      branch: $branch
      leader: $leader
      recruiter: $recruiter
      designation: $designation
      commissionPercentage: $commissionPercentage
      joinDate: $joinDate
      resignDate: $resignDate
      incomeTaxNo: $incomeTaxNo
      withholdingTax: $withholdingTax
      leaderboard: $leaderboard
      active: $active
      remark: $remark
    ) {
      id
      name
      displayName
      email
      mobile
      branch
      leader
      designation
      active
      avatarUrl
    }
  }
`;

export const DELETE_AGENTS = gql`
  mutation DeleteAgents($ids: [ID!]!) {
    deleteAgents(ids: $ids)
  }
`;
