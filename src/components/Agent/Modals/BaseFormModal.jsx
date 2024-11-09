import { Modal, Form } from "antd";

const BaseFormModal = ({ title, open, onClose, onSubmit, form, children }) => {
  return (
    <Modal title={title} open={open} onCancel={onClose} onOk={onSubmit}>
      <Form form={form} layout="vertical">
        {children}
      </Form>
    </Modal>
  );
};

export default BaseFormModal;
