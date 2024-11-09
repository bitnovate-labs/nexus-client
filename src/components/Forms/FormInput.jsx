import { Form, Input } from "antd";

const FormInput = ({
  name,
  label,
  required,
  rules = [],
  placeholder,
  type = "text",
  ...props
}) => {
  const defaultRules = required
    ? [{ required: true, message: `Please enter ${label.toLowerCase()}` }]
    : [];
  const combinedRules = [...defaultRules, ...rules];

  const InputComponent = type === "textarea" ? Input.TextArea : Input;

  return (
    <Form.Item name={name} label={label} rules={combinedRules} {...props}>
      <InputComponent
        placeholder={placeholder}
        {...(type === "textarea" && { rows: 4 })}
      />
    </Form.Item>
  );
};

export default FormInput;
