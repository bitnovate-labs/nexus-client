import { gql } from "@apollo/client";

export const CREATE_BANK = gql`
  mutation CreateBank($name: String!, $swiftCode: String, $active: Boolean!) {
    createBank(name: $name, swiftCode: $swiftCode, active: $active) {
      id
      name
      swiftCode
      active
    }
  }
`;

export const UPDATE_BANK = gql`
  mutation UpdateBank(
    $id: ID!
    $name: String
    $swiftCode: String
    $active: Boolean
  ) {
    updateBank(id: $id, name: $name, swiftCode: $swiftCode, active: $active) {
      id
      name
      swiftCode
      active
    }
  }
`;

export const DELETE_BANKS = gql`
  mutation DeleteBanks($ids: [ID!]!) {
    deleteBanks(ids: $ids)
  }
`;
