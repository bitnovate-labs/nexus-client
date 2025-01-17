import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Dropdown,
  message,
  DatePicker,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import EventFormModal from "./components/EventFormModal";
import { convertToCSV, downloadCSV } from "../../utils/csvExport";
import { useEvents } from "../../hooks/useEvents";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const EventsSettings = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    date: "",
    name: "",
    branch: "",
    designation: "",
  });

  const { events, loading, deleteEvents } = useEvents();

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    try {
      await deleteEvents(selectedRowKeys);
      message.success(`Deleted ${selectedRowKeys.length} items`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to delete events");
      console.error("Delete error:", error);
    }
  };

  const handleExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to export");
      return;
    }
    const selectedData = events.filter((item) =>
      selectedRowKeys.includes(item.id)
    );

    const fields = [
      { header: "Date", getter: (item) => item.date },
      { header: "Name", getter: (item) => item.name },
      { header: "Branch", getter: (item) => item.branch },
      { header: "Designation", getter: (item) => item.designation },
    ];

    const csvContent = convertToCSV(selectedData, fields);
    downloadCSV(csvContent, "events.csv");
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

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => {
        const parsedDate = dayjs(date);
        return parsedDate.isValid() ? parsedDate.format("DD/MM/YYYY") : "-";
      },
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
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
  ];

  const filteredData = events.filter((item) => {
    return Object.keys(searchFilters).every((key) => {
      const searchValue = searchFilters[key].toLowerCase();
      if (key === "date" && !searchValue) return true;
      if (key === "date") {
        return item[key]?.startsWith(searchValue);
      }
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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ml-2">Event</h1>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingEvent(null);
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <DatePicker
          className="w-full"
          onChange={(date) =>
            setSearchFilters((prev) => {
              const formattedDate = date ? date.format("YYYY-MM-DD") : "";
              return { ...prev, date: formattedDate };
            })
          }
          placeholder="Select date"
          format="DD/MM/YYYY"
        />
        <Input
          placeholder="Name"
          value={searchFilters.name}
          onChange={(e) =>
            setSearchFilters((prev) => ({ ...prev, name: e.target.value }))
          }
          prefix={<SearchOutlined />}
        />
        <Input
          placeholder="Branch"
          value={searchFilters.branch}
          onChange={(e) =>
            setSearchFilters((prev) => ({ ...prev, branch: e.target.value }))
          }
          prefix={<SearchOutlined />}
        />
        <Input
          placeholder="Designation"
          value={searchFilters.designation}
          onChange={(e) =>
            setSearchFilters((prev) => ({
              ...prev,
              designation: e.target.value,
            }))
          }
          prefix={<SearchOutlined />}
        />
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          loading={loading}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            position: ["bottomCenter"],
            showTotal: (total) => `${total} record(s)`,
          }}
          className="bg-white dark:bg-gray"
          onRow={(record) => ({
            onClick: () => navigate(`/events/${record.id}`),
            style: { cursor: "pointer" },
          })}
        />
      </div>

      {/* Event Form Modal */}
      <EventFormModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingEvent(null);
        }}
        event={editingEvent}
      />
    </div>
  );
};

export default EventsSettings;
