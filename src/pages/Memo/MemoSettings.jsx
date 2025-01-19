import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Dropdown,
  message,
  DatePicker,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useMemos } from "../../hooks/useMemos";
import MemoFormModal from "./components/MemoFormModal";
import { convertToCSV, downloadCSV } from "../../utils/csvExport";
import dayjs from "dayjs";

const MemoSettings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingMemo, setEditingMemo] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    date: "",
    title: "",
    validity: "",
  });

  const { memos, loading, deleteMemos } = useMemos();

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    try {
      await deleteMemos(selectedRowKeys);
      message.success(`Deleted ${selectedRowKeys.length} items`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to delete memos");
      console.error("Delete error:", error);
    }
  };

  const handleExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to export");
      return;
    }
    const selectedData = memos.filter((item) =>
      selectedRowKeys.includes(item.id)
    );

    const fields = [
      {
        header: "Date",
        getter: (item) => dayjs(item.date).format("DD/MM/YYYY"),
      },
      { header: "Title", getter: (item) => item.title },
      {
        header: "Validity",
        getter: (item) => dayjs(item.validity).format("DD/MM/YYYY"),
      },
    ];

    const csvContent = convertToCSV(selectedData, fields);
    downloadCSV(csvContent, "memos.csv");
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
      key: "date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Validity",
      dataIndex: "validity",
      key: "validity",
      render: (validity) => dayjs(validity).format("DD/MM/YYYY"),
      sorter: (a, b) => dayjs(a.validity).unix() - dayjs(b.validity).unix(),
    },
  ];

  const filteredData = memos.filter((item) => {
    return Object.keys(searchFilters).every((key) => {
      const searchValue = searchFilters[key].toLowerCase();
      if (key === "date" || key === "validity") {
        if (!searchValue) return true;
        return dayjs(item[key]).format("YYYY-MM-DD").startsWith(searchValue);
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
    <div className="space-y-4">
      {/* ---------------------------------------------------------------------- */}
      {/* PAGE FILTERS and BUTTONS SECTION */}
      <div className="flex flex-col gap-2 lg:flex-row-reverse justify-between">
        <div className="flex justify-center lg:flex-1">
          {/* BUTTONS - RIGHT SECTION */}
          <Row gutter={4} style={{ width: "100%" }} justify="end">
            <Col
              xs={12}
              md={6}
              lg={4}
              className="lg:max-w-[150px] lg:min-w-[150px]"
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingMemo(null);
                  setIsModalVisible(true);
                }}
                block
              >
                New
              </Button>
            </Col>
            <Col
              xs={12}
              md={6}
              lg={4}
              className="lg:max-w-[150px] lg:min-w-[150px]"
            >
              <Dropdown
                menu={{ items: moreActionsItems }}
                trigger={["hover", "click"]}
                placement="bottomRight"
              >
                <Button block>More Actions</Button>
              </Dropdown>
            </Col>
          </Row>
        </div>
        {/* FILTERS - LEFT SECTION */}
        <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
          <DatePicker
            className="w-full"
            onChange={(date) =>
              setSearchFilters((prev) => ({
                ...prev,
                date: date ? date.format("YYYY-MM-DD") : "",
              }))
            }
            placeholder="Select date"
            format="DD/MM/YYYY"
          />
          <Input
            placeholder="Title"
            value={searchFilters.title}
            onChange={(e) =>
              setSearchFilters((prev) => ({ ...prev, title: e.target.value }))
            }
            prefix={<SearchOutlined />}
          />
          <DatePicker
            className="w-full"
            onChange={(date) =>
              setSearchFilters((prev) => ({
                ...prev,
                validity: date ? date.format("YYYY-MM-DD") : "",
              }))
            }
            placeholder="Select validity"
            format="DD/MM/YYYY"
          />
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* MAIN CONTENT SECTION */}

      {/* DEKSTOP TABLE VIEW */}
      <div className="rounded-lg overflow-hidden shadow-md">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            position: ["bottomCenter"],
            showTotal: (total) => `${total} record(s)`,
          }}
        />
      </div>

      {/* MOBILE TABLE VIEW (if available) */}

      {/* DRAWER COMPONENT (if available) */}

      {/* MODAL COMPONENT */}
      <MemoFormModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingMemo(null);
        }}
        memo={editingMemo}
      />
    </div>
  );
};

export default MemoSettings;
