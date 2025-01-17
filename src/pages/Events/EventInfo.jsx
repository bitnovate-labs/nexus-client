import { useParams, useNavigate } from "react-router-dom";
import { Button, message, Space } from "antd";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import EventInfoDetails from "./components/EventInfoDetails";
import EventAttendees from "./components/EventAttendees";
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "../../graphql/queries/events";
import { convertToCSV, downloadCSV } from "../../utils/csvExport";
import EventFormModal from "./components/EventFormModal";
import { useState } from "react";

const EventInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, loading } = useQuery(GET_EVENT, {
    variables: { id },
  });

  const handleBack = () => {
    navigate("/events-settings");
  };

  const handleEdit = () => {
    setIsModalVisible(true);
  };

  const handleExportAttendance = () => {
    const attendees = data?.event?.attendees || [];
    if (attendees.length === 0) {
      message.info("No attendees to export");
      return;
    }

    const fields = [
      { header: "Name", getter: (item) => item.name },
      { header: "Ranking", getter: (item) => item.ranking },
    ];

    const csvContent = convertToCSV(attendees, fields);
    downloadCSV(csvContent, `event-attendees-${id}.csv`);
    message.success("Attendance list exported successfully");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const event = data?.event;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          Back
        </Button>
        <Space>
          <Button icon={<EditOutlined />} onClick={handleEdit}>
            Edit
          </Button>
          <Button icon={<DownloadOutlined />} onClick={handleExportAttendance}>
            Export Attendance
          </Button>
        </Space>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Event Info */}
        <div className="lg:col-span-4">
          <EventInfoDetails event={event} />
        </div>

        {/* Right Column - Attendees */}
        <div className="lg:col-span-8">
          <EventAttendees eventId={id} />
        </div>
      </div>

      {/* Event Form Modal */}
      <EventFormModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        event={event}
      />
    </div>
  );
};

export default EventInfo;
