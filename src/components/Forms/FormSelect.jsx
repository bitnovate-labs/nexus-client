import { Form, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const FormSelect = ({
  name,
  label,
  required,
  options = [],
  onAdd,
  rules = [],
  ...props
}) => {
  const defaultRules = required
    ? [{ required: true, message: `Please select ${label.toLowerCase()}` }]
    : [];
  const combinedRules = [...defaultRules, ...rules];

  return (
    <Form.Item
      name={name}
      label={label}
      rules={combinedRules}
      className={onAdd ? "mb-0" : ""}
      {...props}
    >
      <div className={onAdd ? "flex gap-2" : ""}>
        <Select className={onAdd ? "flex-1" : ""} {...props}>
          {options.map((option) => (
            <Option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </Option>
          ))}
        </Select>
        {onAdd && (
          <Button icon={<PlusOutlined />} onClick={onAdd}>
            Add
          </Button>
        )}
      </div>
    </Form.Item>
  );
};

export default FormSelect;
