import { useState } from "react";
import { Table, Button, Input, Space, Tag, Dropdown, message } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useBanks } from "../../hooks/useBanks";
import BankFormModal from "./components/BankFormModal";

const Banks = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingBank, setEditingBank] = useState(null);
  const { banks, loading, deleteBank } = useBanks();

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    try {
      await deleteBank(selectedRowKeys);
      message.success(`Deleted ${selectedRowKeys.length} items`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to delete banks");
      console.log("Delete error, handleDelete, Banks.jsx", error);
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
        const bankToEdit = banks.find((bank) => bank.id === selectedRowKeys[0]);
        setEditingBank(bankToEdit);
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
            setEditingBank(record);
            setIsModalVisible(true);
          }}
          className="!p-0 !h-auto text-left"
        >
          {text}
        </Button>
      ),
    },
    {
      title: "SWIFT Code",
      dataIndex: "swiftCode",
      key: "swiftCode",
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

  const filteredBanks = banks.filter(
    (bank) =>
      bank.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      bank.swiftCode?.toLowerCase().includes(searchText.toLowerCase())
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
        <h1 className="text-2xl font-bold">Banks</h1>
        <Space>
          <Input
            placeholder="Search banks"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingBank(null);
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
          dataSource={filteredBanks}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredBanks.length,
            pageSize: 10,
            position: ["bottomCenter"],
            showTotal: (total) => `${total} record(s)`,
          }}
          className="bg-white dark:bg-gray"
        />
      </div>

      <BankFormModal
        open={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setEditingBank(null);
        }}
        bank={editingBank}
      />
    </div>
  );
};

export default Banks;
