import { Card, Table, Button, Space, Modal, message, Dropdown } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const EventsSettings = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      key: "1",
      date: "16/01/2025",
      name: "Tyson XXXX",
      branch: "Kuala Lumpur",
      designation: "Leader",
    },
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const moreMenuItems = [
    {
      key: "delete",
      label: "Delete",
      onClick: () => handleBulkDelete(),
    },
    {
      key: "export",
      label: "Export",
      onClick: () => handleExport(),
    },
    {
      key: "advancedSearch",
      label: "Advanced Search",
      onClick: () => handleAdvancedSearch(),
    },
  ];

  const columns = [
    {
      title: "",
      key: "checkbox",
      width: 32,
      render: () => null,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      sorter: (a, b) => a.branch.localeCompare(b.branch),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      sorter: (a, b) => a.designation.localeCompare(b.designation),
    },
    {
      title: "",
      key: "action",
      width: 48,
      render: (_, record) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />
      ),
    },
  ];

  const handleAdd = () => {
    message.info("Add functionality to be implemented");
  };

  const handleEdit = (record) => {
    message.info(`Edit event: ${record.name}`);
  };

  const handleBulkDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    Modal.confirm({
      title: "Are you sure you want to delete these events?",
      content: `This will permanently delete ${selectedRowKeys.length} selected events`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        message.success(`Deleted ${selectedRowKeys.length} events`);
        setSelectedRowKeys([]);
      },
    });
  };

  const handleExport = () => {
    message.info("Export functionality to be implemented");
  };

  const handleAdvancedSearch = () => {
    message.info("Advanced search to be implemented");
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div className="p-6">
      <Card
        title="Event"
        extra={
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              New
            </Button>
            <Dropdown
              menu={{ items: moreMenuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button>
                More <MoreOutlined />
              </Button>
            </Dropdown>
          </Space>
        }
      >
        <div className="mb-4 flex gap-2">
          <input type="date" className="ant-input" />
          <input placeholder="Name" className="ant-input" />
          <input placeholder="Branch" className="ant-input" />
          <input placeholder="Designation" className="ant-input" />
          <Button icon={<SearchOutlined />} />
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            total: data.length,
            pageSize: 10,
            showSizeChanger: false,
            showTotal: (total) => `${total} record(s)`,
          }}
        />
      </Card>
    </div>
  );
};

export default EventsSettings;
