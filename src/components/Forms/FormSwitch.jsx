import { Form, Switch } from "antd";

export const FormSwitch = ({ name, label, required = false, ...props }) => {
  return (
    <Form.Item
      name={name}
      label={required ? <span className="text-red-600">{label}</span> : label}
      valuePropName="checked"
    >
      <Switch
        defaultChecked
        checkedChildren="YES"
        unCheckedChildren="NO"
        {...props}
      />
    </Form.Item>
  );
};
