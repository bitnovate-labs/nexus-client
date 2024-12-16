import { useQuery, useMutation } from "@apollo/client";
import { GET_DEVELOPERS } from "../graphql/queries/developers";
import {
  CREATE_DEVELOPER,
  UPDATE_DEVELOPER,
  DELETE_DEVELOPERS,
} from "../graphql/mutations/developers";

export const useDevelopers = () => {
  const { data, loading, error } = useQuery(GET_DEVELOPERS);

  const [createDeveloperMutation] = useMutation(CREATE_DEVELOPER, {
    refetchQueries: [{ query: GET_DEVELOPERS }],
  });

  const [updateDeveloperMutation] = useMutation(UPDATE_DEVELOPER, {
    refetchQueries: [{ query: GET_DEVELOPERS }],
  });

  const [deleteDevelopersMutation] = useMutation(DELETE_DEVELOPERS, {
    refetchQueries: [{ query: GET_DEVELOPERS }],
  });

  const createDeveloper = async (developerData) => {
    try {
      const { data } = await createDeveloperMutation({
        variables: developerData,
      });
      return data.createDeveloper;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateDeveloper = async (id, developerData) => {
    try {
      const { data } = await updateDeveloperMutation({
        variables: { id, ...developerData },
      });
      return data.updateDeveloper;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteDevelopers = async (ids) => {
    try {
      const { data } = await deleteDevelopersMutation({
        variables: { ids },
      });
      return data.deleteDevelopers;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    developers: data?.developers || [],
    loading,
    error,
    createDeveloper,
    updateDeveloper,
    deleteDevelopers,
  };
};
