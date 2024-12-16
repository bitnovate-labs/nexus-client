import { useState } from "react";
import { Drawer, Form, Button, Divider, message } from "antd";
import PersonalInfoForm from "./PersonalInfoForm";
import BankingInfoForm from "./BankingInfoForm";
import GeneralInfoForm from "./GeneralInfoForm";
import RenTagForm from "./RenTagForm";
import { formatDateForServer } from "../../../utils/dateUtils";
import { useAgents } from "../../../hooks/useAgents";

const DEFAULT_FORM_VALUES = {
  withholdingTax: false,
  leaderboard: false,
  active: true,
};

const AgentFormDrawer = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { createAgent } = useAgents();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Transform dates for server
      const transformedValues = {
        ...values,
        joinDate: formatDateForServer(values.joinDate),
        resignDate: values.resignDate
          ? formatDateForServer(values.resignDate)
          : null,
        renExpiredDate: values.renExpiredDate
          ? formatDateForServer(values.renExpiredDate)
          : null,
        // Set default values for optional fields
        withholdingTax:
          values.withholdingTax ?? DEFAULT_FORM_VALUES.withholdingTax,
        leaderboard: values.leaderboard ?? DEFAULT_FORM_VALUES.leaderboard,
        active: values.active ?? DEFAULT_FORM_VALUES.active,
        commissionPercentage:
          values.commissionPercentage ??
          DEFAULT_FORM_VALUES.commissionPercentage,
        branch: values.branch || DEFAULT_FORM_VALUES.branch,
        designation: values.designation || DEFAULT_FORM_VALUES.designation,
      };

      await createAgent(transformedValues);
      message.success("Agent created successfully");
      // form.resetFields();
      handleClose();
    } catch (error) {
      if (error.message) {
        message.error(error.message);
      } else {
        console.error("Form validation failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title="New Agent"
      width={720}
      open={open}
      onClose={handleClose}
      extra={
        <div className="flex gap-2">
          <Button onClick={handleClose}>Cancel</Button>
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
        initialValues={DEFAULT_FORM_VALUES}
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
            <h3 className="text-lg font-medium mb-4">REN Tag</h3>
            <RenTagForm />
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
