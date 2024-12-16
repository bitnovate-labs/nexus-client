import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "../graphql/mutations/auth";

export const useChangePassword = () => {
  const [changePasswordMutation, { loading }] = useMutation(CHANGE_PASSWORD);

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const { data } = await changePasswordMutation({
        variables: { oldPassword, newPassword },
      });
      return data.changePassword;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    changePassword,
    loading,
  };
};
