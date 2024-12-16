import { Modal, Form, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const BaseFormModal = ({
  title,
  open,
  onClose,
  onSubmit,
  form,
  children,
  loading = false,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      onOk={onSubmit}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveOutlined />}
          onClick={onSubmit}
          loading={loading}
        >
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {children}
      </Form>
    </Modal>
  );
};

export default BaseFormModal;
