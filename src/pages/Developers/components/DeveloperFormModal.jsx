import React from "react";
import { Form, message } from "antd";
import InputForm from "@components/forms/InputForm";
import BaseFormModal from "@components/modals/BaseFormModal";
import { useDevelopers } from "@hooks/useDevelopers";

const DeveloperFormModal = ({ open, onClose, developer }) => {
  const [form] = Form.useForm();
  const { createDeveloper, updateDeveloper } = useDevelopers();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (developer) {
        await updateDeveloper(developer.id, values);
        message.success("Developer updated successfully");
      } else {
        await createDeveloper(values);
        message.success("Developer created successfully");
      }

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Developer form validation failed:", error);
      message.error(error.message || "Failed to save developer");
    }
  };

  React.useEffect(() => {
    if (developer) {
      form.setFieldsValue(developer);
    } else {
      form.resetFields();
    }
  }, [developer, form]);

  return (
    <BaseFormModal
      title={developer ? "Edit Developer" : "Add Developer"}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      form={form}
    >
      <InputForm
        name="name"
        label="Name"
        required
        placeholder="Enter developer name"
      />

      <InputForm
        name="registrationNo"
        label="Registration No"
        placeholder="Enter registration number"
      />

      <InputForm
        name="address"
        label="Address"
        type="textarea"
        placeholder="Enter address"
      />

      <InputForm
        name="contactPerson"
        label="Contact Person"
        placeholder="Enter contact person name"
      />

      <InputForm
        name="contactNo"
        label="Contact No"
        placeholder="Enter contact number"
      />
    </BaseFormModal>
  );
};

export default DeveloperFormModal;
