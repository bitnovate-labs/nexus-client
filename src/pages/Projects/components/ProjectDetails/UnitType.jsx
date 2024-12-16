import { useState } from "react";
import { Card, Button, Table, Modal, Form, Input, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useProjectDetails } from "../../../../hooks/useProjectDetails";

const UnitType = ({ projectId }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUnitType, setEditingUnitType] = useState(null);
  const { project, loading, unitTypes } = useProjectDetails(projectId);

  // Handle Submit
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingUnitType) {
        await unitTypes.update({
          variables: {
            id: editingUnitType.id,
            ...values,
          },
        });
        message.success("Unit type updated successfully");
      } else {
        await unitTypes.create({
          variables: {
            projectId,
            ...values,
          },
        });
        message.success("Unit type created successfully");
      }

      handleCancel();
    } catch (error) {
      message.error(error.message);
    }
  };

  // Handle Edit
  const handleEdit = (unitType) => {
    setEditingUnitType(unitType);
    form.setFieldsValue(unitType);
    setIsModalVisible(true);
  };

  //  Handle Delete
  const handleDelete = async (id) => {
    try {
      await unitTypes.delete({
        variables: { id },
      });
      message.success("Unit type deleted successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  //  Handle Cancel
  const handleCancel = () => {
    form.resetFields();
    setEditingUnitType(null);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Card title="Unit Type" className="shadow-md">
        {/* Add Button */}
        <div className="mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            New unit type
          </Button>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={project?.unitTypes || []}
          loading={loading}
          rowKey="id"
          pagination={{
            total: project?.unitTypes?.length || 0,
            pageSize: 10,
            showTotal: (total) => `${total} record(s)`,
          }}
        />
      </Card>

      {/* Modal */}
      <Modal
        title={editingUnitType ? "Edit Unit Type" : "New Unit Type"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UnitType;
