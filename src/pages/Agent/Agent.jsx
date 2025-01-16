import { useState } from "react";
import { Table, Input, Button, Space, Dropdown, message } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useAgents } from "../../hooks/useAgents";
import AgentFormDrawer from "./components/AgentFormDrawer";
import AgentDetailsDrawer from "./components/AgentDetailsDrawer";
import AgentMobileCard from "./components/AgentMobileCard";
import { convertToCSV, downloadCSV } from "../../utils/csvExport";

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

  const { agents, loading, deleteAgents } = useAgents();

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    try {
      await deleteAgents(selectedRowKeys);
      message.success(`Deleted ${selectedRowKeys.length} items`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to delete agents");
      console.log("Delete error, handleDelete, Agent.jsx", error);
    }
  };

  const handleExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to export");
      return;
    }
    const selectedData = agents.filter((item) =>
      selectedRowKeys.includes(item.id)
    );

    const fields = [
      { header: "Name", getter: (item) => item.name },
      { header: "Display Name", getter: (item) => item.displayName },
      { header: "Email", getter: (item) => item.email },
      { header: "Mobile", getter: (item) => item.mobile },
      { header: "Branch", getter: (item) => item.branch },
      { header: "Leader", getter: (item) => item.leader },
      { header: "Designation", getter: (item) => item.designation },
    ];

    const csvContent = convertToCSV(selectedData, fields);
    downloadCSV(csvContent, "agents.csv");
    message.success(`Exported ${selectedRowKeys.length} items`);
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
      sorter: (a, b) =>
        (a.displayName || "").localeCompare(b.displayName || ""),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      sorter: (a, b) => (a.mobile || "").localeCompare(b.mobile || ""),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      sorter: (a, b) => (a.branch || "").localeCompare(b.branch || ""),
    },
    {
      title: "Leader",
      dataIndex: "leader",
      key: "leader",
      sorter: (a, b) => (a.leader || "").localeCompare(b.leader || ""),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      sorter: (a, b) =>
        (a.designation || "").localeCompare(b.designation || ""),
    },
  ];

  const filteredData = agents.filter((item) => {
    return Object.keys(searchText).every((key) => {
      const searchValue = searchText[key].toLowerCase();
      const itemValue = (item[key] || "").toLowerCase();
      return itemValue.includes(searchValue);
    });
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ml-2 dark:text-white">Agents</h1>
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

      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
        {Object.keys(searchText).map((key) => (
          <Input
            key={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={searchText[key]}
            onChange={(e) =>
              setSearchText({ ...searchText, [key]: e.target.value })
            }
            prefix={<SearchOutlined />}
            className="w-full"
          />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="rounded-lg overflow-hidden shadow-md">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            pagination={{
              total: filteredData.length,
              pageSize: 10,
              position: ["bottomCenter"],
              showTotal: (total) => `${total} record(s)`,
            }}
            className="bg-white dark:bg-gray"
            scroll={{
              x: 1020,
              y: "calc(100vh - 300px)",
            }}
            rowKey="id"
          />
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          filteredData.map((agent) => (
            <AgentMobileCard
              key={agent.id}
              agent={agent}
              onClick={handleNameClick}
            />
          ))
        )}
      </div>

      {/* ORIGINAL MOBILE VIEW - TO BE REMOVED LATER IF AGENT CARD IS ACCEPTABLE */}
      {/* <div className="relative">
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredData}
              loading={loading}
              pagination={{
                total: filteredData.length,
                pageSize: 10,
                position: ["bottomCenter"],
                showTotal: (total) => `${total} record(s)`,
              }}
              className="bg-white dark:bg-gray"
              scroll={{
                x: 1020,
                y: "calc(100vh - 300px)",
              }}
              rowKey="id"
            />
          </div>
        </div>
      </div> */}

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
