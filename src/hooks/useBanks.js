import { useQuery, useMutation } from "@apollo/client";
import { GET_BANKS } from "../graphql/queries/banks";
import {
  CREATE_BANK,
  UPDATE_BANK,
  DELETE_BANKS,
} from "../graphql/mutations/banks";

export const useBanks = () => {
  const { data, loading, error } = useQuery(GET_BANKS);

  const [createBankMutation] = useMutation(CREATE_BANK, {
    refetchQueries: [{ query: GET_BANKS }],
  });

  const [updateBankMutation] = useMutation(UPDATE_BANK, {
    refetchQueries: [{ query: GET_BANKS }],
  });

  const [deleteBanksMutation] = useMutation(DELETE_BANKS, {
    refetchQueries: [{ query: GET_BANKS }],
  });

  const createBank = async (bankData) => {
    try {
      const { data } = await createBankMutation({
        variables: bankData,
      });
      return data.createBank;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateBank = async (id, bankData) => {
    try {
      const { data } = await updateBankMutation({
        variables: { id, ...bankData },
      });
      return data.updateBank;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteBank = async (ids) => {
    try {
      const { data } = await deleteBanksMutation({
        variables: { ids },
      });
      return data.deleteBanks;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    banks: data?.banks || [],
    loading,
    error,
    createBank,
    updateBank,
    deleteBank,
  };
};
