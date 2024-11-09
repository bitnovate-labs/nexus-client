import { useState } from "react";
import { Drawer, Form, Button, Divider } from "antd";
import PersonalInfoForm from "./PersonalInfoForm";
import BankingInfoForm from "./BankingInfoForm";
import GeneralInfoForm from "./GeneralInfoForm";

const AgentFormDrawer = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log("Form values:", values);
      // TODO: Handle form submission
      onClose();
    } catch (error) {
      console.error("Form validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="New Agent"
      width={720}
      open={open}
      onClose={onClose}
      extra={
        <div className="flex gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            Save
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        className="space-y-6"
        scrollToFirstError
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Personal Info</h3>
            <PersonalInfoForm />
          </div>

          <Divider />

          <div>
            <h3 className="text-lg font-medium mb-4">Banking Info</h3>
            <BankingInfoForm />
          </div>

          <Divider />

          <div>
            <h3 className="text-lg font-medium mb-4">General</h3>
            <GeneralInfoForm />
          </div>
        </div>
      </Form>
    </Drawer>
  );
};

export default AgentFormDrawer;
