import { useState } from "react";
import { Table, DatePicker, Row, Col } from "antd";
import {} from "@ant-design/icons";
import { useMemos } from "../../hooks/useMemos";
import dayjs from "dayjs";

const Memo = () => {
  const [searchFilters, setSearchFilters] = useState({
    date: "",
    validity: "",
  });

  const { memos, loading } = useMemos();

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
      return true;
    });
  });

  return (
    <div className="space-y-4">
      {/* ---------------------------------------------------------------------- */}
      {/* PAGE FILTERS and BUTTONS SECTION */}
      <div className="flex flex-col gap-2 lg:flex-row-reverse justify-between">
        {/* BUTTONS - RIGHT SECTION - intentionally left empty to occupy the spacing on the right */}
        <div className="flex justify-center lg:flex-1"></div>
        {/* FILTERS - LEFT SECTION */}
        <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
          <DatePicker
            style={{ width: "100%" }}
            onChange={(date) =>
              setSearchFilters((prev) => ({
                ...prev,
                date: date ? date.format("YYYY-MM-DD") : "",
              }))
            }
            placeholder="Select date"
            format="DD/MM/YYYY"
          />
          <DatePicker
            style={{ width: "100%" }}
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
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Table
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

      {/* MOBILE CARD (if available) */}

      {/* INSERT DRAWER COMPONENT HERE (if available) */}

      {/* INSERT MODAL COMPONENT HERE (if available) */}
    </div>
  );
};

export default Memo;
