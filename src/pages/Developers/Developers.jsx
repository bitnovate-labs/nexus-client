import { useState } from "react";
import { Table, Button, Input, Space, Dropdown, message } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDevelopers } from "../../hooks/useDevelopers";
import DeveloperFormModal from "./components/DeveloperFormModal";

const Developers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingDeveloper, setEditingDeveloper] = useState(null);
  const { developers, loading, deleteDevelopers } = useDevelopers();

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    try {
      await deleteDevelopers(selectedRowKeys);
      message.success(`Deleted ${selectedRowKeys.length} items`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to delete developers");
      console.log("Delete error, handleDelete, Developers.jsx", error);
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
        const developerToEdit = developers.find(
          (developer) => developer.id === selectedRowKeys[0]
        );
        setEditingDeveloper(developerToEdit);
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
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            setEditingDeveloper(record);
            setIsModalVisible(true);
          }}
          className="!p-0 !h-auto text-left"
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Registration No",
      dataIndex: "registrationNo",
      key: "registrationNo",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
    },
  ];

  const filteredDevelopers = developers.filter(
    (developer) =>
      developer.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      developer.registrationNo
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      developer.contactPerson?.toLowerCase().includes(searchText.toLowerCase())
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
        <h1 className="text-2xl font-bold">Developers</h1>
        <Space>
          <Input
            placeholder="Search developers"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingDeveloper(null);
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
          dataSource={filteredDevelopers}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredDevelopers.length,
            pageSize: 10,
            position: ["bottomCenter"],
            showTotal: (total) => `${total} record(s)`,
          }}
          className="bg-white dark:bg-gray"
        />
      </div>

      <DeveloperFormModal
        open={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setEditingDeveloper(null);
        }}
        developer={editingDeveloper}
      />
    </div>
  );
};

export default Developers;
