import { useState } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Select,
  InputNumber,
  Space,
  DatePicker,
  message,
  Switch,
} from "antd";
import {
  ExpandOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useProjectDetails } from "../../../../hooks/useProjectDetails";
import { useAgents } from "../../../../hooks/useAgents";
import dayjs from "dayjs";

const ProjectManagerCommission = ({ projectId }) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCommission, setEditingCommission] = useState(null);
  const { project, loading, managerCommissions } = useProjectDetails(projectId);
  const { agents, loading: agentsLoading } = useAgents();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const formattedValues = {
        ...values,
        fromDate: values.fromDate.format("YYYY-MM-DD"),
        toDate: values.toDate.format("YYYY-MM-DD"),
      };

      if (editingCommission) {
        await managerCommissions.update({
          variables: {
            id: editingCommission.id,
            ...formattedValues,
          },
        });
        message.success("Project manager commission updated successfully");
      } else {
        await managerCommissions.create({
          variables: {
            projectId,
            ...formattedValues,
          },
        });
        message.success("Project manager commission created successfully");
      }

      handleCancel();
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await managerCommissions.delete({
        variables: { id },
      });
      message.success("Project manager commission deleted successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingCommission(null);
    setModalVisible(false);
  };

  const columns = [
    {
      title: "Commission Scheme",
      dataIndex: ["commissionScheme", "name"],
      key: "commissionScheme",
    },
    {
      title: "From Date",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "To Date",
      dataIndex: "toDate",
      key: "toDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Agent",
      dataIndex: ["agent", "name"],
      key: "agent",
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
      title: "Schedule Payment",
      key: "schedulePayment",
      render: (_, record) =>
        record.schedulePaymentValue
          ? `${record.schedulePaymentValue}${
              record.schedulePaymentType === "percentage" ? "%" : " RM"
            }`
          : "-",
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
              setEditingCommission(record);
              form.setFieldsValue({
                ...record,
                fromDate: dayjs(record.fromDate),
                toDate: dayjs(record.toDate),
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

  const agentOptions = agents
    .filter((a) => a.active)
    .map((a) => ({
      value: a.id,
      label: a.displayName || a.name,
    }));

  return (
    <>
      <Card
        title="Manager Commission"
        extra={<ExpandOutlined />}
        className="shadow-sm"
      >
        <div className="mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            New manager commission
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={project?.managerCommissions || []}
          loading={loading}
          rowKey="id"
          pagination={{
            total: project?.managerCommissions?.length || 0,
            pageSize: 10,
            showTotal: (total) => `${total} record(s)`,
          }}
        />
      </Card>

      <Modal
        title={
          editingCommission
            ? "Edit Manager Commission"
            : "New Manager Commission"
        }
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={800}
      >
        <Form form={form} layout="vertical">
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

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="fromDate"
              label="From Date"
              rules={[{ required: true }]}
            >
              <DatePicker className="w-full" format="DD/MM/YYYY" />
            </Form.Item>

            <Form.Item
              name="toDate"
              label="To Date"
              rules={[{ required: true }]}
            >
              <DatePicker className="w-full" format="DD/MM/YYYY" />
            </Form.Item>
          </div>

          <Form.Item name="agentId" label="Agent" rules={[{ required: true }]}>
            <Select
              placeholder="Select agent"
              options={agentOptions}
              loading={agentsLoading}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
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

            <Form.Item
              name="commissionValue"
              label="Commission Value"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>

          <Form.Item
            name="overriding"
            label="Overriding"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="schedulePaymentType" label="Schedule Payment Type">
              <Select allowClear>
                <Select.Option value="percentage">Percentage (%)</Select.Option>
                <Select.Option value="RM">Fixed Amount (RM)</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="schedulePaymentValue"
              label="Schedule Payment Value"
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectManagerCommission;
