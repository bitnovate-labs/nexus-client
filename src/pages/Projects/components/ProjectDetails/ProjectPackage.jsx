import { useState } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Space,
  message,
} from "antd";
import {
  ExpandOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useProjectDetails } from "../../../../hooks/useProjectDetails";
import dayjs from "dayjs";

const ProjectPackage = ({ projectId }) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const { project, loading, packages } = useProjectDetails(projectId);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const formattedValues = {
        ...values,
        dateFrom: values.dateFrom.format("YYYY-MM-DD"),
        dateTo: values.dateTo.format("YYYY-MM-DD"),
      };

      if (editingPackage) {
        await packages.update({
          variables: {
            id: editingPackage.id,
            ...formattedValues,
          },
        });
        message.success("Package updated successfully");
      } else {
        await packages.create({
          variables: {
            projectId,
            ...formattedValues,
          },
        });
        message.success("Package created successfully");
      }

      handleCancel();
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await packages.delete({
        variables: { id },
      });
      message.success("Package deleted successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingPackage(null);
    setModalVisible(false);
  };

  const columns = [
    {
      title: "Package Name",
      dataIndex: "packageName",
      key: "packageName",
    },
    {
      title: "From Date",
      dataIndex: "dateFrom",
      key: "dateFrom",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "To Date",
      dataIndex: "dateTo",
      key: "dateTo",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Deduct From",
      dataIndex: "deductFrom",
      key: "deductFrom",
      render: (type) => {
        switch (type) {
          case "gross":
            return "Gross";
          case "nett":
            return "Nett";
          default:
            return "None";
        }
      },
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, record) =>
        `${record.amountValue}${
          record.amountType === "percentage" ? "%" : " RM"
        }`,
    },
    {
      title: "Deduct Type",
      dataIndex: "deductType",
      key: "deductType",
      render: (type) => {
        switch (type) {
          case "rebate":
            return "Rebate";
          case "discount":
            return "Discount";
          default:
            return "None";
        }
      },
    },
    {
      title: "Display Sequence",
      dataIndex: "displaySequence",
      key: "displaySequence",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPackage(record);
              form.setFieldsValue({
                ...record,
                dateFrom: dayjs(record.dateFrom),
                dateTo: dayjs(record.dateTo),
              });
              setModalVisible(true);
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="Rebate / Discount Package"
        extra={<ExpandOutlined />}
        className="shadow-sm"
      >
        <div className="mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            New rebate / discount package
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={project?.packages || []}
          loading={loading}
          rowKey="id"
          pagination={{
            total: project?.packages?.length || 0,
            pageSize: 10,
            showTotal: (total) => `${total} record(s)`,
          }}
        />
      </Card>

      <Modal
        title={editingPackage ? "Edit Package" : "New Package"}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="packageName"
            label="Package Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter package name" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="dateFrom"
              label="From Date"
              rules={[{ required: true }]}
            >
              <DatePicker className="w-full" format="DD/MM/YYYY" />
            </Form.Item>

            <Form.Item
              name="dateTo"
              label="To Date"
              rules={[{ required: true }]}
            >
              <DatePicker className="w-full" format="DD/MM/YYYY" />
            </Form.Item>
          </div>

          <Form.Item
            name="deductFrom"
            label="Deduct From"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="none">None</Select.Option>
              <Select.Option value="gross">Gross</Select.Option>
              <Select.Option value="nett">Nett</Select.Option>
            </Select>
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="amountType"
              label="Amount Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="percentage">Percentage (%)</Select.Option>
                <Select.Option value="RM">Fixed Amount (RM)</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="amountValue"
              label="Amount Value"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>

          <Form.Item
            name="deductType"
            label="Deduct Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="none">None</Select.Option>
              <Select.Option value="rebate">Rebate</Select.Option>
              <Select.Option value="discount">Discount</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="displaySequence"
            label="Display Sequence"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectPackage;
