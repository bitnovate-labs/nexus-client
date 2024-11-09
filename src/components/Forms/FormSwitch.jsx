import { Form, Switch } from "antd";

const FormSwitch = ({ name, label, required, rules = [], ...props }) => {
  const defaultRules = required
    ? [
        {
          required: true,
          message: `Please select ${label.toLowerCase()} status`,
        },
      ]
    : [];
  const combinedRules = [...defaultRules, ...rules];

  return (
    <Form.Item
      name={name}
      label={label}
      valuePropName="checked"
      rules={combinedRules}
      {...props}
    >
      <Switch checkedChildren="Yes" unCheckedChildren="No" />
    </Form.Item>
  );
};

export default FormSwitch;
