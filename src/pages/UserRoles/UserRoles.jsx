import { useState } from "react";
import { Table, Button, Input, Tag, Dropdown, message, Row, Col } from "antd";
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

  // HANDLE DELETE
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
                placeholder="Search roles"
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
                  setEditingUserRole(null);
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
          dataSource={filteredUserRoles}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredUserRoles.length,
            pageSize: 10,
            position: ["bottomCenter"],
            showTotal: (total) => `${total} record(s)`,
          }}
        />
      </div>

      {/* MOBILE TABLE VIEW (if available) */}

      {/* DRAWER COMPONENT (if available) */}

      {/* MODAL COMPONENT */}
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
