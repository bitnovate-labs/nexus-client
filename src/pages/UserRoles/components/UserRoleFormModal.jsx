import { useEffect } from "react";
import { Form } from "antd";
import { FormInput, FormSwitch } from "forms";
import BaseFormModal from "../../../components/modals/BaseFormModal";
import { useUserRoles } from "../../../hooks/useUserRoles";
import { message } from "antd";

const UserRoleFormModal = ({ visible, onCancel, userRole }) => {
  const [form] = Form.useForm();
  const { createUserRole, updateUserRole } = useUserRoles();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (userRole) {
        await updateUserRole(userRole.id, {
          ...values,
          active: values.active ?? true,
        });
        message.success("User role updated successfully");
      } else {
        await createUserRole({
          ...values,
          active: values.active ?? true,
        });
        message.success("User role created successfully");
      }

      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("User role form validation failed:", error);
      message.error(error.message || "Failed to save user role");
    }
  };

  useEffect(() => {
    if (userRole) {
      form.setFieldsValue(userRole);
    } else {
      form.resetFields();
      form.setFieldsValue({ active: true }); // Set default value for active
    }
  }, [userRole, form]);

  return (
    <BaseFormModal
      title={userRole ? "Edit User Role" : "Add User Role"}
      open={visible}
      onClose={onCancel}
      onSubmit={handleSubmit}
      form={form}
    >
      <FormInput
        name="code"
        label="Code"
        required
        placeholder="Enter role code"
      />

      <FormInput
        name="name"
        label="Name"
        required
        placeholder="Enter role name"
      />

      <FormSwitch name="active" label="Active" required />
    </BaseFormModal>
  );
};

export default UserRoleFormModal;
