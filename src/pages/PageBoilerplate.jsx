import { useState } from "react";
import { Table, Input, Button, Dropdown, message, Row, Col } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
// import { convertToCSV, downloadCSV } from "../../utils/csvExport"; // More Actions - Export to CSV Button

const PageBoilerplate = () => {
  //   const [searchText, setSearchText] = useState({ // search input state for search filters
  //     name: "",
  //     displayName: "",
  //     mobile: "",
  //     branch: "",
  //     leader: "",
  //     designation: "",
  //   });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  //   const [selectedAgent, setSelectedAgent] = useState(null);

  // HANDLE DELETE
  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }
    try {
      await deleteAgents(selectedRowKeys);
      message.success(`Deleted ${selectedRowKeys.length} items`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to delete agents");
      console.log("Delete error, handleDelete, Agent.jsx", error);
    }
  };
  // HANDLE EXPORT
  //   const handleExport = () => {
  //     if (selectedRowKeys.length === 0) {
  //       message.warning("Please select items to export");
  //       return;
  //     }
  //     const selectedData = agents.filter((item) =>
  //       selectedRowKeys.includes(item.id)
  //     );

  //     const fields = [
  //       { header: "Name", getter: (item) => item.name },
  //       { header: "Display Name", getter: (item) => item.displayName },
  //       { header: "Email", getter: (item) => item.email },
  //       { header: "Mobile", getter: (item) => item.mobile },
  //       { header: "Branch", getter: (item) => item.branch },
  //       { header: "Leader", getter: (item) => item.leader },
  //       { header: "Designation", getter: (item) => item.designation },
  //     ];

  //     const csvContent = convertToCSV(selectedData, fields);
  //     downloadCSV(csvContent, "agents.csv");
  //     message.success(`Exported ${selectedRowKeys.length} items`);
  //   };

  // MORE ACTIONS BUTTON
  //   const moreActionsItems = [
  //     {
  //       key: "delete",
  //       label: "Delete Selection",
  //       icon: <DeleteOutlined />,
  //       onClick: handleDelete,
  //     },
  //     {
  //       key: "export",
  //       label: "Export to CSV",
  //       icon: <DownloadOutlined />,
  //       onClick: handleExport,
  //     },
  //   ];

  // HANDLE ROW CLICK
  const handleNameClick = (record) => {
    setSelectedAgent(record);
    setDetailsDrawerOpen(true);
  };

  // COLUMNS (IF USING TABLE / DATAGRID)
  //   const columns = [
  //     {
  //       title: "Name",
  //       dataIndex: "name",
  //       key: "name",
  //       fixed: "left",
  //       sorter: (a, b) => a.name.localeCompare(b.name),
  //       render: (text, record) => (
  //         <Button
  //           type="link"
  //           onClick={() => handleNameClick(record)}
  //           className="!p-0 !h-auto text-left"
  //         >
  //           {text}
  //         </Button>
  //       ),
  //     },
  //     {
  //       title: "Display Name",
  //       dataIndex: "displayName",
  //       key: "displayName",
  //       sorter: (a, b) =>
  //         (a.displayName || "").localeCompare(b.displayName || ""),
  //     },
  //     {
  //       title: "Mobile",
  //       dataIndex: "mobile",
  //       key: "mobile",
  //       sorter: (a, b) => (a.mobile || "").localeCompare(b.mobile || ""),
  //     },
  //     {
  //       title: "Branch",
  //       dataIndex: "branch",
  //       key: "branch",
  //       sorter: (a, b) => (a.branch || "").localeCompare(b.branch || ""),
  //     },
  //     {
  //       title: "Leader",
  //       dataIndex: "leader",
  //       key: "leader",
  //       sorter: (a, b) => (a.leader || "").localeCompare(b.leader || ""),
  //     },
  //     {
  //       title: "Designation",
  //       dataIndex: "designation",
  //       key: "designation",
  //       sorter: (a, b) =>
  //         (a.designation || "").localeCompare(b.designation || ""),
  //     },
  //   ];

  // TO FILTER DATA BASED ON SEARCH VALUE
  //   const filteredData = agents.filter((item) => {
  //     return Object.keys(searchText).every((key) => {
  //       const searchValue = searchText[key].toLowerCase();
  //       const itemValue = (item[key] || "").toLowerCase();
  //       return itemValue.includes(searchValue);
  //     });
  //   });

  //   TO GET SELECTED ROW LOCATION
  //   const rowSelection = {
  //     selectedRowKeys,
  //     onChange: (newSelectedRowKeys) => {
  //       setSelectedRowKeys(newSelectedRowKeys);
  //     },
  //   };

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
              className="lg:max-w-[150px] lg:min-w-[150px] mb-2 md:mb-0"
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setDrawerOpen(true)}
                block // must include this to fill the <Col> space
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
                // menu={{ items: moreActionsItems }}
                // trigger={["hover", "click"]}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button block> More Actions</Button>
              </Dropdown>
            </Col>
          </Row>
        </div>
        {/* FILTERS - LEFT SECTION */}
        <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
          {/* MULTIPLE FILTERS */}
          {/* <DatePicker
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
          /> */}
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* MAIN CONTENT SECTION HERE !!! */}

      {/* DEKSTOP TABLE VIEW */}
      <div className="hidden md:block">
        <div className="rounded-lg overflow-hidden shadow-md">
          <Table />
        </div>
      </div>

      {/* MOBILE TABLE VIEW (if available) */}
      <div className="sm:block md:hidden ">
        <div className="rounded-lg overflow-hidden shadow-md">
          <Table />
        </div>
      </div>

      {/* MOBILE CARD (if available) */}
      <div className="md:hidden">
        <div>or Mobile Card</div>
      </div>

      {/* DRAWER COMPONENT (if available) */}
      {/* MODAL COMPONENT (if available) */}
    </div>
  );
};

export default PageBoilerplate;
