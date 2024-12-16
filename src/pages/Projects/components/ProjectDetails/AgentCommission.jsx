import { useState } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Select,
  InputNumber,
  message,
  Switch,
  Divider,
} from "antd";
import {
  ExpandOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useProjectDetails } from "../../../../hooks/useProjectDetails";
import { useDesignations } from "../../../../hooks/useDesignations";
import dayjs from "dayjs";

const AgentCommission = ({ projectId }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCommission, setEditingCommission] = useState(null);
  const { project, loading, agentCommissions } = useProjectDetails(projectId);
  const { designations, loading: designationsLoading } = useDesignations();

  // Handle Submit
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingCommission) {
        await agentCommissions.update({
          variables: {
            id: editingCommission.id,
            ...values,
          },
        });
        message.success("Agent commission updated successfully");
      } else {
        await agentCommissions.create({
          variables: {
            projectId,
            ...values,
          },
        });
        message.success("Agent commission created successfully");
      }

      handleCancel();
    } catch (error) {
      message.error(error.message);
    }
  };

  // Handle Edit
  const handleEdit = (scheme) => {
    setEditingCommission(scheme);
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
      await agentCommissions.delete({
        variables: { id },
      });
      message.success("Agent commission deleted successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    form.resetFields();
    setEditingCommission(null);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Commission Scheme",
      dataIndex: ["commissionScheme", "name"],
      key: "commissionScheme",
    },
    {
      title: "Designation",
      dataIndex: ["designation", "name"],
      key: "designation",
    },
    {
      title: "Commission",
      key: "commission",
      render: (_, record) =>
        `${record.commissionValue}${
          record.commissionType === "percentage" ? "%" : " RM"
        }`,
    },
    {
      title: "Overriding",
      dataIndex: "overriding",
      key: "overriding",
      render: (overriding) => (overriding ? "Yes" : "No"),
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

  const designationOptions = designations
    .filter((d) => d.active)
    .map((d) => ({
      value: d.id,
      label: d.name,
    }));

  return (
    <>
      <Card
        title="Agent Commission"
        extra={<ExpandOutlined />}
        className="shadow-md"
      >
        {/* Add Button */}
        <div className="mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            New agent commission
          </Button>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={project?.agentCommissions || []}
          loading={loading}
          rowKey="id"
          pagination={{
            total: project?.agentCommissions?.length || 0,
            pageSize: 5,
            showTotal: (total) => `${total} record(s)`,
          }}
        />
      </Card>

      {/* Modal */}
      <Modal
        title={
          editingCommission ? "Edit Agent Commission" : "New Agent Commission"
        }
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={800}
      >
        <Form form={form} layout="vertical">
          {/* COMMISSION SCHEME */}
          <Form.Item
            name="commissionSchemeId"
            label="Commission Scheme"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select commission scheme">
              {project?.commissionSchemes?.map((scheme) => (
                <Select.Option key={scheme.id} value={scheme.id}>
                  {scheme.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* SALES COMMISSION TYPE */}
          <Form.Item
            name="salesCommissionType"
            label="Sales Commission Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select sales commission type">
              <Select.Option value="project_overriding">
                Project Overriding
              </Select.Option>
              <Select.Option value="upline_overriding">
                Upline Overriding
              </Select.Option>
            </Select>
          </Form.Item>

          {/* DESIGNATION */}
          <Form.Item
            name="designationId"
            label="Designation"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select designation (default: All)"
              options={designationOptions}
              loading={designationsLoading}
              allowClear
            />
          </Form.Item>

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

          {/* OVERRIDING SECTION */}
          <Form.Item
            name="overriding"
            label="Overriding"
            valuePropName="checked"
            initialValue={false}
            rules={[{ required: true }]}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          {/* SCHEDULE PAYMENT SECTION */}
          <div>
            <h3 className="text-base font-semibold mt-10">Schedule Payment</h3>
          </div>

          <Divider />

          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="Stage">
              <h3 className="font-semibold">FULL</h3>
            </Form.Item>
            <Form.Item name="schedulePaymentType" label="Type">
              <Select allowClear>
                <Select.Option value="percentage">Percentage (%)</Select.Option>
                <Select.Option value="RM">Fixed Amount (RM)</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="schedulePaymentValue" label="Amount">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AgentCommission;
