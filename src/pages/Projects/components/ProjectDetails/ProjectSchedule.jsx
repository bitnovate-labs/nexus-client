import { useState } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  message,
  InputNumber,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useProjectDetails } from "../../../../hooks/useProjectDetails";

const ProjectSchedule = ({ projectId }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const { project, loading, schedules } = useProjectDetails(projectId);

  // Handle Submit
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingSchedule) {
        await schedules.update({
          variables: {
            id: editingSchedule.id,
            ...values,
          },
        });
        message.success("Schedule updated successfully");
      } else {
        await schedules.create({
          variables: {
            projectId,
            ...values,
          },
        });
        message.success("Schedule created successfully");
      }

      // form.resetFields();
      handleCancel();
    } catch (error) {
      message.error(error.message);
    }
  };

  // Handle Edit
  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    form.setFieldsValue(schedule); // Populate the form with schedule data
    setIsModalVisible(true); // Show the modal
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await schedules.delete({
        variables: { id },
      });
      message.success("Schedule deleted successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    form.resetFields();
    setEditingSchedule(null);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Sequence",
      dataIndex: "sequence",
      key: "sequence",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 150,
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
      <Card title="Project Schedule" className="shadow-md">
        <div className="mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            New schedule
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={project?.schedules || []}
          loading={loading}
          rowKey="id"
          pagination={{
            total: project?.schedules?.length || 0,
            pageSize: 10,
            showTotal: (total) => `${total} record(s)`,
          }}
        />
      </Card>

      {/* Project Schedule Modal */}
      <Modal
        title={editingSchedule ? "Edit Schedule" : "New Schedule"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {/* Name */}
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          {/* Sequence */}
          <Form.Item
            name="sequence"
            label="Sequence"
            rules={[{ required: true, message: "Please enter sequence!" }]}
          >
            <InputNumber
              min={1}
              max={100}
              placeholder="Enter sequence"
              className="w-full"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectSchedule;
