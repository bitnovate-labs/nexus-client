import { Form, DatePicker } from "antd";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@utils/dateUtils";

const DatePickerForm = ({ name, label, required = false, ...props }) => {
  return (
    <Form.Item
      name={name}
      label={required ? <span className="text-red-600">{label}</span> : label}
      rules={
        required
          ? [
              {
                required: true,
                message: `Please select ${label.toLowerCase()}!`,
              },
            ]
          : []
      }
      getValueFromEvent={(date) => date}
      getValueProps={(value) => {
        if (!value) return { value: undefined };
        return { value: dayjs.isDayjs(value) ? value : dayjs(value) };
      }}
    >
      <DatePicker className="w-full" format={DATE_FORMAT.display} {...props} />
    </Form.Item>
  );
};

export default DatePickerForm;
