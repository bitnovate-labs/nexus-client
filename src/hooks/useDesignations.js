import { useQuery, useMutation } from "@apollo/client";
import { GET_DESIGNATIONS } from "../graphql/queries/designations";
import {
  CREATE_DESIGNATION,
  UPDATE_DESIGNATION,
  DELETE_DESIGNATION,
} from "../graphql/mutations/designations";

export const useDesignations = () => {
  const { data, loading, error } = useQuery(GET_DESIGNATIONS);

  const [createDesignationMutation] = useMutation(CREATE_DESIGNATION, {
    refetchQueries: [{ query: GET_DESIGNATIONS }],
  });

  const [updateDesignationMutation] = useMutation(UPDATE_DESIGNATION, {
    refetchQueries: [{ query: GET_DESIGNATIONS }],
  });

  const [deleteDesignationMutation] = useMutation(DELETE_DESIGNATION, {
    refetchQueries: [{ query: GET_DESIGNATIONS }],
  });

  const createDesignation = async (designationData) => {
    try {
      const { data } = await createDesignationMutation({
        variables: designationData,
      });
      return data.createDesignation;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateDesignation = async (id, designationData) => {
    try {
      const { data } = await updateDesignationMutation({
        variables: { id, ...designationData },
      });
      return data.updateDesignation;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteDesignation = async (ids) => {
    try {
      const { data } = await deleteDesignationMutation({
        variables: { ids: Array.isArray(ids) ? ids : [ids] },
      });
      return data.deleteDesignation;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    designations: data?.designations || [],
    loading,
    error,
    createDesignation,
    updateDesignation,
    deleteDesignation,
  };
};
