import { useEffect } from "react";
import { Form, message } from "antd";
import FormInput from "../../../components/forms/FormInput";
import FormSwitch from "../../../components/forms/FormSwitch";
import BaseFormModal from "../../../components/modals/BaseFormModal";
import { useBanks } from "../../../hooks/useBanks";

const BankFormModal = ({ open, onClose, bank }) => {
  const [form] = Form.useForm();
  const { createBank, updateBank } = useBanks();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (bank) {
        await updateBank(bank.id, {
          ...values,
          active: values.active ?? true,
        });
        message.success("Bank updated successfully");
      } else {
        await createBank({
          ...values,
          active: values.active ?? true,
        });
        message.success("Bank created successfully");
      }

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Bank form validation failed:", error);
      message.error(error.message || "Failed to save bank");
    }
  };

  useEffect(() => {
    if (bank) {
      form.setFieldsValue(bank);
    } else {
      form.resetFields();
    }
  }, [bank, form]);

  return (
    <BaseFormModal
      title={bank ? "Edit Bank" : "Add Bank"}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      form={form}
    >
      <FormInput
        name="name"
        label="Name"
        placeholder="Enter bank name"
        required
      />

      <FormInput
        name="swiftCode"
        label="SWIFT Code"
        placeholder="Enter SWIFT code"
      />

      <FormSwitch name="active" label="Active" required />
    </BaseFormModal>
  );
};

export default BankFormModal;
