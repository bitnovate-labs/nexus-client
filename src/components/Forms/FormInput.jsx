import { Form, Input, InputNumber } from "antd";

const FormInput = ({
  name,
  label,
  required = false,
  type = "text",
  rules = [],
  placeholder,
  min,
  max,
  ...props
}) => {
  const getInput = () => {
    switch (type) {
      case "textarea":
        return <Input.TextArea rows={4} placeholder={placeholder} {...props} />;
      case "number":
        return (
          <InputNumber
            className="w-full"
            placeholder={placeholder}
            min={min}
            max={max}
            {...props}
          />
        );
      default:
        return <Input type={type} placeholder={placeholder} {...props} />;
    }
  };

  const allRules = [
    ...(required
      ? [{ required: true, message: `Please input ${label.toLowerCase()}!` }]
      : []),
    ...rules,
  ];

  return (
    <Form.Item
      name={name}
      label={required ? <span className="text-red-600">{label}</span> : label}
      rules={allRules}
    >
      {getInput()}
    </Form.Item>
  );
};

export default FormInput;
