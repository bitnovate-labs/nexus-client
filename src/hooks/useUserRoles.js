import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_ROLES } from "../graphql/queries/userRoles";
import {
  CREATE_USER_ROLE,
  UPDATE_USER_ROLE,
  DELETE_USER_ROLES,
} from "../graphql/mutations/userRoles";

export const useUserRoles = () => {
  const { data, loading, error } = useQuery(GET_USER_ROLES);

  const [createUserRoleMutation] = useMutation(CREATE_USER_ROLE, {
    refetchQueries: [{ query: GET_USER_ROLES }],
  });

  const [updateUserRoleMutation] = useMutation(UPDATE_USER_ROLE, {
    refetchQueries: [{ query: GET_USER_ROLES }],
  });

  const [deleteUserRolesMutation] = useMutation(DELETE_USER_ROLES, {
    refetchQueries: [{ query: GET_USER_ROLES }],
  });

  const createUserRole = async (userRoleData) => {
    try {
      const { data } = await createUserRoleMutation({
        variables: userRoleData,
      });
      return data.createUserRole;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateUserRole = async (id, userRoleData) => {
    try {
      const { data } = await updateUserRoleMutation({
        variables: { id, ...userRoleData },
      });
      return data.updateUserRole;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteUserRoles = async (ids) => {
    try {
      const { data } = await deleteUserRolesMutation({
        variables: { ids },
      });
      return data.deleteUserRoles;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    userRoles: data?.userRoles || [],
    loading,
    error,
    createUserRole,
    updateUserRole,
    deleteUserRoles,
  };
};
