import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Input,
  Space,
  Tag,
  Dropdown,
  message,
  Select,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  // EditOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useProjects } from "../../hooks/useProjects";
import { useDevelopers } from "../../hooks/useDevelopers";
import { useStates } from "../../hooks/useStates";
import ProjectFormModal from "./components/Projects/ProjectFormModal";
import ProjectMobileCard from "./components/Projects/ProjectMobileCard";
import { convertToCSV, downloadCSV } from "../../utils/csvExport";

const Projects = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    developer: undefined,
    active: undefined,
    projectManager: "",
    state: undefined,
  });

  const { projects, loading, deleteProjects } = useProjects();
  const { developers, loading: developersLoading } = useDevelopers();
  const { states, loading: statesLoading } = useStates();

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    try {
      await deleteProjects(selectedRowKeys);
      message.success(`Deleted ${selectedRowKeys.length} items`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to delete projects");
      console.log("Delete error, handleDelete, Projects.jsx", error);
    }
  };

  const handleExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to export");
      return;
    }

    const selectedData = projects.filter((item) =>
      selectedRowKeys.includes(item.id)
    );
    const fields = [
      { header: "Name", getter: (item) => item.name },
      { header: "Company", getter: (item) => item.company },
      { header: "Developer", getter: (item) => item.developer?.name },
      {
        header: "Developer Pay Tax",
        getter: (item) => (item.developerPayTax ? "Yes" : "No"),
      },
      { header: "State", getter: (item) => item.state?.name },
      { header: "Description", getter: (item) => item.description },
      { header: "Project Manager", getter: (item) => item.projectManager },
      { header: "State", getter: (item) => item.state?.name },
      {
        header: "Status",
        getter: (item) => (item.active ? "Active" : "Inactive"),
      },
    ];

    const csvContent = convertToCSV(selectedData, fields);
    downloadCSV(csvContent, "projects.csv");
    message.success(`Exported ${selectedRowKeys.length} items`);
  };

  const handleRowClick = (record) => {
    navigate(`/projects/${record.id}`);
  };

  const moreActionsItems = [
    // TEMPORARY COMMENT
    // {
    //   key: "edit",
    //   label: "Edit Selection",
    //   icon: <EditOutlined />,
    //   onClick: () => {
    //     if (selectedRowKeys.length !== 1) {
    //       message.warning("Please select one item to edit");
    //       return;
    //     }
    //     const projectToEdit = projects.find(
    //       (project) => project.id === selectedRowKeys[0]
    //     );
    //     setEditingProject(projectToEdit);
    //     setIsModalVisible(true);
    //   },
    // },
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => handleRowClick(record)}
          className="!p-0 !h-auto text-left"
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Developer",
      dataIndex: ["developer", "name"],
      key: "developer",
      sorter: (a, b) => a.developer.name.localeCompare(b.developer.name),
    },
    {
      title: "Project Manager",
      dataIndex: "projectManager",
      key: "projectManager",
      sorter: (a, b) =>
        (a.projectManager || "").localeCompare(b.projectManager || ""),
    },
    {
      title: "State",
      dataIndex: ["state", "name"],
      key: "state",
      sorter: (a, b) => a.state.name.localeCompare(b.state.name),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active) => (
        <Tag color={active ? "success" : "error"}>
          {active ? "Active" : "Inactive"}
        </Tag>
      ),
    },
  ];

  const filteredProjects = projects.filter((project) => {
    return (
      (!filters.name ||
        project.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.developer ||
        project.developer?.name
          ?.toLowerCase()
          .includes(filters.developer.toLowerCase())) &&
      (!filters.projectManager ||
        project.projectManager
          ?.toLowerCase()
          .includes(filters.projectManager.toLowerCase())) &&
      (filters.active === undefined ||
        String(project.active) === filters.active) &&
      (!filters.state ||
        project.state?.name
          ?.toLowerCase()
          .includes(filters.state.toLowerCase()))
    );
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const renderMobileCard = (project) => (
    <ProjectMobileCard
      key={project.id}
      project={project}
      onClick={() => {
        handleRowClick(project);
      }}
    />
  );

  const developerOptions = developers.map((dev) => ({
    value: dev.name,
    label: dev.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.name,
    label: state.name,
  }));

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Space wrap className="flex-none">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingProject(null);
                setIsModalVisible(true);
              }}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            placeholder="Name"
            value={filters.name}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, name: e.target.value }))
            }
            prefix={<SearchOutlined />}
          />
          <Select
            placeholder="Developer"
            value={filters.developer}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, developer: value }))
            }
            allowClear
            showSearch
            loading={developersLoading}
            options={developerOptions}
          />
          <Select
            placeholder="Active"
            value={filters.active}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, active: value }))
            }
            allowClear
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
          />
          <Input
            placeholder="Project Manager"
            value={filters.projectManager}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                projectManager: e.target.value,
              }))
            }
            prefix={<SearchOutlined />}
          />
          <Select
            placeholder="State"
            value={filters.state}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, state: value }))
            }
            allowClear
            showSearch
            loading={statesLoading}
            options={stateOptions}
          />
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="rounded-lg overflow-hidden shadow-md">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredProjects}
            loading={loading}
            rowKey="id"
            pagination={{
              total: filteredProjects.length,
              pageSize: 10,
              position: ["bottomCenter"],
              showTotal: (total) => `${total} record(s)`,
            }}
            className="bg-white dark:bg-gray"
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          filteredProjects.map(renderMobileCard)
        )}
      </div>

      <ProjectFormModal
        open={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setEditingProject(null);
        }}
        project={editingProject}
      />
    </div>
  );
};

export default Projects;
