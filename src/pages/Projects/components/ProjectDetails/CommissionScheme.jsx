import { useState } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  DatePicker,
  Select,
  InputNumber,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useProjectDetails } from "../../../../hooks/useProjectDetails";
import dayjs from "dayjs";

const CommissionScheme = ({ projectId }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const { project, loading, commissionSchemes } = useProjectDetails(projectId);

  // Handle Submit
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const formattedValues = {
        ...values,
        fromDate: values.fromDate.format("YYYY-MM-DD"),
        toDate: values.toDate.format("YYYY-MM-DD"),
      };

      if (editingScheme) {
        await commissionSchemes.update({
          variables: {
            id: editingScheme.id,
            projectId,
            ...formattedValues,
          },
        });
        message.success("Commission scheme updated successfully");
      } else {
        await commissionSchemes.create({
          variables: {
            projectId,
            ...formattedValues,
          },
        });
        message.success("Commission scheme created successfully");
      }

      handleCancel();
    } catch (error) {
      message.error(error.message);
    }
  };

  // Handle Edit
  const handleEdit = (scheme) => {
    setEditingScheme(scheme);
    form.setFieldsValue({
      ...scheme,
      unitTypeId: scheme.unitType?.id,
      fromDate: dayjs(scheme.fromDate),
      toDate: dayjs(scheme.toDate),
    });
    setIsModalVisible(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await commissionSchemes.delete({
        variables: { id },
      });
      message.success("Commission scheme deleted successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    form.resetFields();
    setEditingScheme(null);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Unit Type",
      dataIndex: ["unitType", "name"],
      key: "unitType",
      // render: (text) => text || "All Types",
    },
    {
      title: "Date",
      key: "date",
      render: (_, record) =>
        `${dayjs(record.fromDate).format("DD/MM/YYYY")} - ${dayjs(
          record.toDate
        ).format("DD/MM/YYYY")}`,
    },
    {
      title: "Unit",
      key: "unit",
      align: "center",
      render: (_, record) =>
        `${record.minUnit || 0} - ${record.maxUnit || "∞"}`,
    },
    {
      title: "Commission",
      key: "commission",
      align: "center",
      render: (_, record) => {
        const commissionValue = record.commissionValue || 0; // Fallback to 0 if null or undefined
        const commissionType = record.commissionType || "percentage"; // Default to 'percentage' if null or undefined

        if (commissionType === "percentage") {
          return `${commissionValue}%`; // Display percentage if commissionType is 'percentage'
        } else if (commissionType === "RM") {
          return `RM ${commissionValue.toFixed(2)}`; // Format as currency if commissionType is 'RM'
        }

        return `Invalid Commission`;
      },
    },
    {
      title: "Actions",
      key: "actions",
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
      <Card title="Commission Scheme" className="shadow-md">
        {/* Add Button */}
        <div className="mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            New commission scheme
          </Button>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={project?.commissionSchemes || []}
          loading={loading}
          rowKey="id"
          pagination={{
            total: project?.commissionSchemes?.length || 0,
            pageSize: 5,
            showTotal: (total) => `${total} record(s)`,
          }}
        />
      </Card>

      {/* Modal */}
      <Modal
        title={
          editingScheme ? "Edit Commission Scheme" : "New Commission Scheme"
        }
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          {/* UNIT TYPE SECTION */}
          <Form.Item
            name="unitTypeId"
            label="Unit Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select unit type" allowClear>
              {/* Default option: All Types */}
              {/* <Select.Option value={0}>All Types</Select.Option> */}
              {project?.unitTypes?.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* DATE SECTION */}
          <div className="grid grid-cols-2 gap-4">
            {/* From Date */}
            <Form.Item
              name="fromDate"
              label="From Date"
              rules={[{ required: true }]}
            >
              <DatePicker className="w-full" format="DD/MM/YYYY" />
            </Form.Item>

            {/* To Date */}
            <Form.Item
              name="toDate"
              label="To Date"
              rules={[{ required: true }]}
            >
              <DatePicker className="w-full" format="DD/MM/YYYY" />
            </Form.Item>
          </div>

          {/* MIN - MAX SECTION*/}
          <div className="grid grid-cols-2 gap-4">
            {/* Min Unit */}
            <Form.Item
              name="minUnit"
              label="Min Unit"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>

            {/* Max Unit */}
            <Form.Item
              name="maxUnit"
              label="Max Unit"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>

          {/* COMMISSION SECTION */}
          <div className="grid grid-cols-2 gap-4">
            {/* Commission Type */}
            <Form.Item
              name="commissionType"
              label="Commission Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="percentage">Percentage (%)</Select.Option>
                <Select.Option value="RM">Fixed Amount (RM)</Select.Option>
              </Select>
            </Form.Item>

            {/* Commission Value */}
            <Form.Item
              name="commissionValue"
              label="Commission Value"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CommissionScheme;
