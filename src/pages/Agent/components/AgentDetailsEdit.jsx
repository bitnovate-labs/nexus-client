import { useEffect } from "react";
import { Form, Button, Space, message, App } from "antd";
import PersonalInfoForm from "../components/PersonalInfoForm";
import BankingInfoForm from "../components/BankingInfoForm";
import RenTagForm from "../components//RenTagForm";
import GeneralInfoForm from "../components/GeneralInfoForm";
import { formatDateForServer, createDayjs } from "../../../utils/dateUtils";

const AgentDetailsEdit = ({ agent, section, onSave, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (agent) {
      // Convert date strings to dayjs objects for form
      const formData = {
        ...agent,
        joinDate: createDayjs(agent.joinDate),
        resignDate: createDayjs(agent.resignDate),
        renExpiredDate: createDayjs(agent.renExpiredDate),
      };
      form.setFieldsValue(formData);
    }
  }, [agent, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Format dates for server
      const formattedValues = {
        ...values, // Override with new values
        joinDate: formatDateForServer(values.joinDate || agent.joinDate),
        resignDate: values.resignDate
          ? formatDateForServer(values.resignDate)
          : null,
        renExpiredDate: values.renExpiredDate
          ? formatDateForServer(values.renExpiredDate)
          : null,
        // Ensure boolean fields are properly set
        active: values.active ?? agent.active ?? true,
        withholdingTax: values.withholdingTax ?? agent.withholdingTax ?? false,
        leaderboard: values.leaderboard ?? agent.leaderboard ?? false,
      };

      // Remove undefined values
      Object.keys(formattedValues).forEach((key) => {
        if (formattedValues[key] === undefined) {
          delete formattedValues[key];
        }
      });

      await onSave(formattedValues);
    } catch (error) {
      console.error("Validation failed:", error);
      <App>
        {message.error(error.message || "Please check the form for errors")}
      </App>;
    }
  };

  const renderForm = () => {
    switch (section) {
      case "personal":
        return <PersonalInfoForm />;
      case "banking":
        return <BankingInfoForm />;
      case "ren":
        return <RenTagForm />;
      case "general":
        return <GeneralInfoForm />;
      default:
        return null;
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        active: agent?.active ?? true,
        withholdingTax: agent?.withholdingTax ?? false,
        leaderboard: agent?.leaderboard ?? false,
      }}
    >
      {renderForm()}
      <div className="flex justify-end mt-6 space-x-2">
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default AgentDetailsEdit;
