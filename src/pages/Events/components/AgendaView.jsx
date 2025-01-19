import { Card, Table, Empty } from "antd";

const AgendaView = ({ selectedDate }) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  // Replace with actual data fetching
  const data = [];

  return (
    <Card
      title="Agenda"
      styles={{
        body: { paddingTop: 5, padding: 5 },
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          total: 0,
          pageSize: 10,
          showSizeChanger: false,
        }}
        locale={{
          emptyText: <Empty description="No data found" />,
        }}
      />
    </Card>
  );
};

export default AgendaView;
