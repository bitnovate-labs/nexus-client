import { Card, Table } from "antd";
import { ExpandOutlined } from "@ant-design/icons";

const EventAttendees = ({ eventId }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Ranking",
      dataIndex: "ranking",
      key: "ranking",
      sorter: (a, b) => a.ranking - b.ranking,
    },
  ];

  // Placeholder data - replace with actual data fetching
  const data = [];

  return (
    <Card
      title="To Be Attended By"
      extra={<ExpandOutlined />}
      className="shadow-md"
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          total: data.length,
          pageSize: 10,
          showTotal: (total) => `${total} record(s)`,
        }}
        locale={{
          emptyText: "No data found.",
        }}
      />
    </Card>
  );
};

export default EventAttendees;
