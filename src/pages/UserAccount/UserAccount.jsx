import { useState } from "react";
import { Table, Button, Input, Tag, Dropdown, message, Row, Col } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/users";
import { DELETE_USERS } from "../../graphql/mutations/users";
import CreateUserModal from "./components/CreateUserModal";

const UserAccount = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const { data, loading } = useQuery(GET_USERS);
  const [deleteUsers] = useMutation(DELETE_USERS, {
    refetchQueries: [{ query: GET_USERS }],
  });

  // HANDLE DELETE
  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    try {
      await deleteUsers({ variables: { ids: selectedRowKeys } });
      message.success(`Deleted ${selectedRowKeys.length} items`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to delete users");
      console.log("Delete error, handleDelete, UserAccount.jsx", error);
    }
  };

  // MORE ACTION BUTTON ITEMS
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
        const userToEdit = users.find((user) => user.id === selectedRowKeys[0]);
        setEditingUser(userToEdit);
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
      // render: (text, record) => (
      //   <Button
      //     type="link"
      //     onClick={() => {
      //       setEditingUser(record);
      //       setIsModalVisible(true);
      //     }}
      //     className="!p-0 !h-auto text-left"
      //   >
      //     {text}
      //   </Button>
      // ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "ADMIN" },
        { text: "Manager", value: "MANAGER" },
        { text: "User", value: "USER" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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

  const users = data?.users || [];
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchText.toLowerCase())
  );

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
              xs={24}
              md={6}
              lg={4}
              className="lg:max-w-[150px] lg:min-w-[150px] mb-2 md:mb-0"
            >
              <Input
                placeholder="Search users"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
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
                  setEditingUser(null);
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
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* MAIN CONTENT SECTION HERE !!! */}

      {/* DEKSTOP TABLE VIEW */}
      <div className="rounded-lg overflow-hidden shadow-md">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredUsers}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredUsers.length,
            pageSize: 10,
            position: ["bottomCenter"],
            showTotal: (total) => `${total} record(s)`,
          }}
        />
      </div>

      {/* MOBILE TABLE VIEW (if available) */}

      {/* DRAWER COMPONENT (if available) */}

      {/* MODAL COMPONENT */}
      <CreateUserModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingUser(null);
        }}
        user={editingUser}
      />
    </div>
  );
};

export default UserAccount;
