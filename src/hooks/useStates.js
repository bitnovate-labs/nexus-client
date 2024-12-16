import { useQuery, useMutation } from "@apollo/client";
import { GET_STATES } from "../graphql/queries/states";
import {
  CREATE_STATE,
  UPDATE_STATE,
  DELETE_STATES,
} from "../graphql/mutations/states";

export const useStates = () => {
  const { data, loading, error } = useQuery(GET_STATES);

  const [createStateMutation] = useMutation(CREATE_STATE, {
    refetchQueries: [{ query: GET_STATES }],
  });

  const [updateStateMutation] = useMutation(UPDATE_STATE, {
    refetchQueries: [{ query: GET_STATES }],
  });

  const [deleteStatesMutation] = useMutation(DELETE_STATES, {
    refetchQueries: [{ query: GET_STATES }],
  });

  const createState = async (stateData) => {
    try {
      const { data } = await createStateMutation({
        variables: stateData,
      });
      return data.createState;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateState = async (id, stateData) => {
    try {
      const { data } = await updateStateMutation({
        variables: { id, ...stateData },
      });
      return data.updateState;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteStates = async (ids) => {
    try {
      const { data } = await deleteStatesMutation({
        variables: { ids },
      });
      return data.deleteStates;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    states: data?.states || [],
    loading,
    error,
    createState,
    updateState,
    deleteStates,
  };
};
