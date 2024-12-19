import React from "react";
import { Form, message } from "antd";
import { FormInput, FormSelect } from "@forms";
import BaseFormModal from "@modals/BaseFormModal";
import { useStates } from "../../../hooks/useStates";

const StateFormModal = ({ open, onClose, state }) => {
  const [form] = Form.useForm();
  const { createState, updateState } = useStates();

  const countryOptions = [
    { value: "", label: "<< None >>" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Singapore", label: "Singapore" },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (state) {
        await updateState(state.id, values);
        message.success("State updated successfully");
      } else {
        await createState(values);
        message.success("State created successfully");
      }

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("State form validation failed:", error);
      message.error(error.message || "Failed to save state");
    }
  };

  React.useEffect(() => {
    if (state) {
      form.setFieldsValue(state);
    } else {
      form.resetFields();
    }
  }, [state, form]);

  return (
    <BaseFormModal
      title={state ? "Edit State" : "Add State"}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      form={form}
    >
      <FormInput
        name="name"
        label="Name"
        required
        placeholder="Enter state name"
      />

      <FormInput
        name="code"
        label="Code"
        required
        placeholder="Enter state code"
      />

      <FormSelect
        name="country"
        label="Country"
        required
        options={countryOptions}
        placeholder="Select country"
      />
    </BaseFormModal>
  );
};

export default StateFormModal;
