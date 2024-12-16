import { useState } from "react";
import { Table, Button, Input, Space, Tag, Dropdown, message } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useUserRoles } from "../../hooks/useUserRoles";
import UserRoleFormModal from "./components/UserRoleFormModal";

const UserRoles = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingUserRole, setEditingUserRole] = useState(null);
  const { userRoles, loading, deleteUserRoles } = useUserRoles();

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    try {
      await deleteUserRoles(selectedRowKeys);
      message.success(`Deleted ${selectedRowKeys.length} items`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to delete user roles");
      console.log("Delete error, handleDelete, UserRoles.jsx", error);
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
        const userRoleToEdit = userRoles.find(
          (role) => role.id === selectedRowKeys[0]
        );
        setEditingUserRole(userRoleToEdit);
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
    // TEMPORARILY COMMENTED OUT!!!
    // {
    //   title: "Code",
    //   dataIndex: "code",
    //   key: "code",
    //   sorter: (a, b) => a.code.localeCompare(b.code),
    //   render: (text, record) => (
    //     <Button
    //       type="link"
    //       onClick={() => {
    //         setEditingUserRole(record);
    //         setIsModalVisible(true);
    //       }}
    //       className="!p-0 !h-auto text-left"
    //     >
    //       {text}
    //     </Button>
    //   ),
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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

  const filteredUserRoles = userRoles.filter(
    (role) =>
      role.code?.toLowerCase().includes(searchText.toLowerCase()) ||
      role.name?.toLowerCase().includes(searchText.toLowerCase())
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
        <h1 className="text-2xl font-bold">User Account Role</h1>
        <Space>
          <Input
            placeholder="Search roles"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingUserRole(null);
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
          dataSource={filteredUserRoles}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredUserRoles.length,
            pageSize: 10,
            position: ["bottomCenter"],
            showTotal: (total) => `${total} record(s)`,
          }}
          className="bg-white dark:bg-gray"
        />
      </div>

      <UserRoleFormModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingUserRole(null);
        }}
        userRole={editingUserRole}
      />
    </div>
  );
};

export default UserRoles;
