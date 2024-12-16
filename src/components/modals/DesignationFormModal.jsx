import { Form } from "antd";
import { FormInput, FormSwitch } from "../forms";
import BaseFormModal from "./BaseFormModal";

const DesignationFormModal = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Designation form values:", values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Designation form validation failed:", error);
    }
  };

  return (
    <BaseFormModal
      title="Add Designation"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      form={form}
    >
      <FormInput name="name" label="Name" required />

      <FormInput
        name="rank"
        label="Rank"
        type="number"
        required
        rules={[{ type: "number", min: 1, message: "Rank must be at least 1" }]}
      />

      <FormSwitch name="active" label="Active" />
    </BaseFormModal>
  );
};

export default DesignationFormModal;
