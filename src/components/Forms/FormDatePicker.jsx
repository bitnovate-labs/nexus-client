import { Form, DatePicker } from "antd";

const FormDatePicker = ({ name, label, required, rules = [], ...props }) => {
  const defaultRules = required
    ? [{ required: true, message: `Please select ${label.toLowerCase()}` }]
    : [];
  const combinedRules = [...defaultRules, ...rules];

  return (
    <Form.Item name={name} label={label} rules={combinedRules} {...props}>
      <DatePicker className="w-full" {...props} />
    </Form.Item>
  );
};

export default FormDatePicker;
