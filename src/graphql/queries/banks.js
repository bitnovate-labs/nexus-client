import { gql } from "@apollo/client";

export const GET_BANKS = gql`
  query GetBanks {
    banks {
      id
      name
      swiftCode
      active
    }
  }
`;

export const GET_BANK = gql`
  query GetBank($id: ID!) {
    bank(id: $id) {
      id
      name
      swiftCode
      active
    }
  }
`;
