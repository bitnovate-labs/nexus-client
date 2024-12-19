import React from "react";
import { Form, message } from "antd";
import { FormInput, FormSwitch } from "@components/forms";
import BaseFormModal from "@components/modals/BaseFormModal";
import { useDesignations } from "../../../hooks/useDesignations";

const DesignationFormModal = ({ open, onClose, designation }) => {
  const [form] = Form.useForm();
  const { createDesignation, updateDesignation } = useDesignations();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (designation) {
        await updateDesignation(designation.id, {
          ...values,
          active: values.active ?? true,
        });
        message.success("Designation updated successfully");
      } else {
        await createDesignation({
          ...values,
          active: values.active ?? true,
        });
        message.success("Designation created successfully");
      }

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Designation form validation failed:", error);
      message.error(error.message || "Failed to save designation");
    }
  };

  React.useEffect(() => {
    if (designation) {
      form.setFieldsValue(designation);
    } else {
      form.resetFields();
    }
  }, [designation, form]);

  return (
    <BaseFormModal
      title={designation ? "Edit Designation" : "Add Designation"}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      form={form}
    >
      <FormInput
        name="name"
        label="Name"
        required
        placeholder="Enter designation name"
      />

      <FormInput
        name="rank"
        label="Rank"
        type="number"
        required
        min={1}
        placeholder="Enter rank number"
      />

      <FormSwitch name="active" label="Active" required />
    </BaseFormModal>
  );
};

export default DesignationFormModal;
