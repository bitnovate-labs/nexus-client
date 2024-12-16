import { useState } from "react";
import { Table, Button, Input, Space, Tag, Dropdown, message } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDesignations } from "../../hooks/useDesignations";
import DesignationFormModal from "./components/DesignationFormModal";

const Designations = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingDesignation, setEditingDesignation] = useState(null);
  const { designations, loading, deleteDesignation } = useDesignations();

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    try {
      await deleteDesignation(selectedRowKeys);
      message.success(`Deleted ${selectedRowKeys.length} items`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to delete designations");
      console.log("Delete error, handleDelete, Designations.jsx", error);
    }
  };

  const moreActionsItems = [
    {
      key: "edit",
      label: "Edit Selection",
      icon: <EditOutlined />,
      onClick: () => {
        if (selectedRowKeys.length !== 1) {
          message.warning("Please select one item to edit");
          return;
        }
        const designationToEdit = designations.find(
          (designation) => designation.id === selectedRowKeys[0]
        );
        setEditingDesignation(designationToEdit);
        setIsModalVisible(true);
      },
    },
    {
      key: "delete",
      label: "Delete Selection",
      icon: <DeleteOutlined />,
      onClick: handleDelete,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      //   render: (text, record) => (
      //     <Button
      //       type="link"
      //       onClick={() => {
      //         setEditingDesignation(record);
      //         setIsModalVisible(true);
      //       }}
      //       className="!p-0 !h-auto text-left"
      //     >
      //       {text}
      //     </Button>
      //   ),
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      sorter: (a, b) => a.rank - b.rank,
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

  const filteredDesignations = designations.filter((designation) =>
    designation.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4 md:flex md:justify-between items-center lg:mb-6 ">
        <h1 className="text-2xl font-bold">Designations</h1>
        <Space>
          <Input
            placeholder="Search designations"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingDesignation(null);
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

      <div className="rounded-lg overflow-hidden shadow-lg">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredDesignations}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredDesignations.length,
            pageSize: 10,
            position: ["bottomCenter"],
            showTotal: (total) => `${total} record(s)`,
          }}
          className="bg-white dark:bg-gray"
        />
      </div>

      <DesignationFormModal
        open={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setEditingDesignation(null);
        }}
        designation={editingDesignation}
      />
    </div>
  );
};

export default Designations;
