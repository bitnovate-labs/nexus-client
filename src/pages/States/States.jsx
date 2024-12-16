import { useState } from "react";
import { Table, Button, Input, Space, Dropdown, message } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useStates } from "../../hooks/useStates";
import StateFormModal from "./components/StateFormModal";

const States = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingState, setEditingState] = useState(null);
  const { states, loading, deleteStates } = useStates();

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    try {
      await deleteStates(selectedRowKeys);
      message.success(`Deleted ${selectedRowKeys.length} items`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to delete states");
      console.log("Delete error, handleDelete, States.jsx", error);
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
        const stateToEdit = states.find(
          (state) => state.id === selectedRowKeys[0]
        );
        setEditingState(stateToEdit);
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
      //         setEditingState(record);
      //         setIsModalVisible(true);
      //       }}
      //       className="!p-0 !h-auto text-left"
      //     >
      //       {text}
      //     </Button>
      //   ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
  ];

  const filteredStates = states.filter(
    (state) =>
      state.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      state.code?.toLowerCase().includes(searchText.toLowerCase()) ||
      state.country?.toLowerCase().includes(searchText.toLowerCase())
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
        <h1 className="text-2xl font-bold">States</h1>
        <Space>
          <Input
            placeholder="Search states"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingState(null);
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
          dataSource={filteredStates}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredStates.length,
            pageSize: 10,
            position: ["bottomCenter"],
            showTotal: (total) => `${total} record(s)`,
          }}
          className="bg-white dark:bg-gray"
        />
      </div>

      <StateFormModal
        open={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setEditingState(null);
        }}
        state={editingState}
      />
    </div>
  );
};

export default States;
