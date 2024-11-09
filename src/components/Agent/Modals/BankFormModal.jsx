import { Form } from "antd";
import { FormInput, FormSwitch } from "../../Forms";
import BaseFormModal from "./BaseFormModal";

const BankFormModal = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Bank form values:", values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Bank form validation failed:", error);
    }
  };

  return (
    <BaseFormModal
      title="Add Bank"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      form={form}
    >
      <FormInput name="name" label="Name" required />

      <FormInput name="swiftCode" label="SWIFT Code" required />

      <FormSwitch name="active" label="Active" />
    </BaseFormModal>
  );
};

export default BankFormModal;
