import { useState } from "react";
import { Table, Input, Button, Space, Dropdown, message } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AgentFormDrawer from "../components/Agent/AgentFormDrawer";

// Dummy data
import { data } from "../dummydata";
import AgentDetailsDrawer from "../components/Agent/AgentDetailsDrawer";

const Agent = () => {
  const [searchText, setSearchText] = useState({
    name: "",
    displayName: "",
    mobile: "",
    branch: "",
    leader: "",
    designation: "",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    // TODO: Implement delete functionality
    message.success(`Deleted ${selectedRowKeys.length} items`);
    setSelectedRowKeys([]);
  };

  const handleExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to export");
      return;
    }
    // TODO: Implement export functionality
    const selectedData = data.filter((item) =>
      selectedRowKeys.includes(item.key)
    );
    const csvContent = convertToCSV(selectedData);
    downloadCSV(csvContent, "agents.csv");
    message.success(`Exported ${selectedRowKeys.length} items`);
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((item) => Object.values(item).join(","));
    return [headers, ...rows].join("\n");
  };

  const downloadCSV = (content, fileName) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const moreActionsItems = [
    {
      key: "delete",
      label: "Delete Selection",
      icon: <DeleteOutlined />,
      onClick: handleDelete,
    },
    {
      key: "export",
      label: "Export to CSV",
      icon: <DownloadOutlined />,
      onClick: handleExport,
    },
  ];

  const handleNameClick = (record) => {
    setSelectedAgent(record);
    setDetailsDrawerOpen(true);
  };

  // Column structure
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => handleNameClick(record)}
          className="!p-0 !h-auto text-left"
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Display Name",
      dataIndex: "displayName",
      key: "displayName",
      sorter: (a, b) => a.displayName.localeCompare(b.displayName),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      sorter: (a, b) => a.mobile.localeCompare(b.mobile),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      sorter: (a, b) => a.branch.localeCompare(b.branch),
    },
    {
      title: "Leader",
      dataIndex: "leader",
      key: "leader",
      sorter: (a, b) => a.leader.localeCompare(b.leader),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      sorter: (a, b) => a.designation.localeCompare(b.designation),
    },
  ];

  const filteredData = data.filter((item) => {
    return Object.keys(searchText).every((key) => {
      return item[key].toLowerCase().includes(searchText[key].toLowerCase());
    });
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        {/* Title */}
        <h1 className="text-2xl font-bold dark:text-white">Agent</h1>
        {/* Right section - Buttons */}
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setDrawerOpen(true)}
          >
            New
          </Button>
          <Dropdown
            menu={{ items: moreActionsItems }}
            trigger={["hover", "click"]}
            placement="bottomRight"
          >
            <Button>More Actions</Button>
          </Dropdown>
        </Space>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
        {Object.keys(searchText).map((key) => (
          <Input
            key={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={searchText[key]}
            onChange={(e) =>
              setSearchText({ ...searchText, [key]: e.target.value })
            }
            className="w-full"
          />
        ))}
      </div>

      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            position: ["bottomCenter"],
          }}
          className=" bg-white dark:bg-gray"
          // scroll={{ x: true }}
          // sticky={{
          //   offsetHeader: 128,
          // }}
          scroll={{
            x: 1020, // Sum of all column widths
            y: "calc(100vh - 300px)", // Adjust based on header and pagination height
          }}
          sticky={{
            offsetHeader: 144, // 64px header + 64px title + 16px padding
          }}
        />
      </div>
      <AgentFormDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <AgentDetailsDrawer
        open={detailsDrawerOpen}
        onClose={() => setDetailsDrawerOpen(false)}
        agent={selectedAgent}
      />
    </div>
  );
};

export default Agent;
