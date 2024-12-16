import { Card, Button, Table, Upload, message } from "antd";
import {
  ExpandOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useProjectDetails } from "../../../../hooks/useProjectDetails";
import dayjs from "dayjs";

const Attachment = ({ projectId }) => {
  const { project, loading, attachments } = useProjectDetails(projectId);

  const handleUpload = async ({ file }) => {
    try {
      await attachments.upload({
        variables: {
          projectId,
          file,
        },
      });
      message.success("File uploaded successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await attachments.delete({
        variables: { id },
      });
      message.success("File deleted successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "File",
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => `${(size / 1024).toFixed(2)} KB`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Created By",
      dataIndex: ["createdBy", "name"],
      key: "createdBy",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <Card title="Attachment" extra={<ExpandOutlined />} className="shadow-sm">
      <div className="mb-4">
        <Upload
          customRequest={({ file, onSuccess }) => {
            handleUpload({ file });
            onSuccess();
          }}
          showUploadList={false}
        >
          <Button type="primary" icon={<PlusOutlined />}>
            New attachment
          </Button>
        </Upload>
      </div>

      <Table
        columns={columns}
        dataSource={project?.attachments || []}
        loading={loading}
        rowKey="id"
        pagination={{
          total: project?.attachments?.length || 0,
          pageSize: 10,
          showTotal: (total) => `${total} record(s)`,
        }}
      />
    </Card>
  );
};

export default Attachment;
