import { Modal, Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useChangePassword } from "../../hooks/useChangePassword";

const ChangePasswordModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const { changePassword, loading } = useChangePassword();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await changePassword(values.oldPassword, values.newPassword);
      message.success("Password changed successfully");
      form.resetFields();
      onCancel();
    } catch (error) {
      if (error.message) {
        message.error(error.message);
      }
    }
  };

  return (
    <Modal
      title="Change Password"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Change Password"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="oldPassword"
          label="Current Password"
          rules={[
            { required: true, message: "Please input your current password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Current Password"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: "Please input your new password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="New Password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm New Password"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
