import { Form, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const SelectForm = ({
  name,
  label,
  required = false,
  options = [],
  loading = false,
  onAdd,
  rules = [],
  ...props
}) => {
  const allRules = [
    ...(required
      ? [{ required: true, message: `Please select ${label.toLowerCase()}!` }]
      : []),
    ...rules,
  ];

  // Filter out any options with null or undefined values
  const validOptions = options.filter((option) => option.value != null);

  return (
    <Form.Item
      name={name}
      label={required ? <span className="text-red-600">{label}</span> : label}
      rules={allRules}
    >
      <Select
        placeholder="<< None >>"
        options={validOptions}
        loading={loading}
        showSearch
        optionFilterProp="label"
        dropdownRender={(menu) => (
          <div>
            {menu}
            {onAdd && (
              <div className="flex justify-end p-2 border-t">
                <Button type="text" icon={<PlusOutlined />} onClick={onAdd} />
              </div>
            )}
          </div>
        )}
        {...props}
      />
    </Form.Item>
  );
};

export default SelectForm;
