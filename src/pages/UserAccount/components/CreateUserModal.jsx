import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { FormInput, FormSelect, FormSwitch } from "../../../components/forms";
import BaseFormModal from "../../../components/modals/BaseFormModal";
import { useMutation } from "@apollo/client";
import { CREATE_USER, UPDATE_USER } from "../../../graphql/mutations/users";
import { GET_USERS } from "../../../graphql/queries/users";
import { useUserRoles } from "../../../hooks/useUserRoles";
import UserRoleFormModal from "../../UserRoles/components/UserRoleFormModal";

const CreateUserModal = ({ visible, onCancel, user }) => {
  const [form] = Form.useForm();
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const { userRoles, loading: rolesLoading } = useUserRoles();

  const [createUser, { loading: createLoading }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (user) {
        await updateUser({
          variables: {
            id: user.id,
            ...values,
            active: values.active ?? true,
          },
        });
        message.success("User updated successfully");
      } else {
        await createUser({
          variables: {
            ...values,
            active: values.active ?? true,
          },
        });
        message.success("User created successfully");
      }

      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Validation failed:", error);
      message.error(error.message || "Failed to save user");
    }
  };

  const roleOptions = userRoles
    .filter((role) => role.active)
    .map((role) => ({
      value: role.code,
      label: role.name,
    }));

  return (
    <>
      <BaseFormModal
        title={user ? "Edit User" : "User Account"}
        open={visible}
        onClose={onCancel}
        onSubmit={handleSubmit}
        form={form}
        loading={createLoading || updateLoading}
      >
        <FormInput name="name" label="Name" required placeholder="Enter name" />

        <FormInput
          name="username"
          label="Username"
          required
          placeholder="Enter username"
        />

        {!user && (
          <FormInput
            name="password"
            label="Password"
            required
            type="password"
            placeholder="Enter password"
          />
        )}

        <FormInput
          name="mobile"
          label="Mobile"
          placeholder="Enter mobile number"
        />

        <FormInput
          name="email"
          label="Email"
          required
          rules={[{ type: "email", message: "Please enter a valid email!" }]}
          placeholder="Enter email"
        />

        <FormSelect
          name="role"
          label="User Account Role"
          options={roleOptions}
          loading={rolesLoading}
          placeholder="Select role"
          onAdd={() => setRoleModalVisible(true)}
        />

        <FormSwitch name="active" label="Active" />
      </BaseFormModal>

      <UserRoleFormModal
        visible={roleModalVisible}
        onCancel={() => setRoleModalVisible(false)}
      />
    </>
  );
};

export default CreateUserModal;
