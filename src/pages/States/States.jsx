import { useState } from "react";
import { Table, Button, Input, Space, Dropdown, message, Row, Col } from "antd";
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

  // HANDLE DELETE
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
                placeholder="Search states"
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
                  setEditingState(null);
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

      {/* MOBILE TABLE VIEW (if available) */}

      {/* DRAWER COMPONENT (if available) */}

      {/* MODAL COMPONENT */}
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
