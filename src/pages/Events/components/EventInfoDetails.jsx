import { Card, Descriptions, Button } from "antd";
import { formatDateTime } from "../../../utils/dateUtils";
import dayjs from "dayjs";

const EventInfoDetails = ({ event }) => {
  if (!event) return null;

  return (
    <Card title="Event Info" className="shadow-md h-auto">
      <div className="mb-4">
        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-400">No image available</div>
          )}
        </div>
      </div>

      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Name">{event.name || "-"}</Descriptions.Item>

        <Descriptions.Item label="Date">
          {dayjs(event.date).format("DD/MM/YYYY") || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Time">{event.time || "-"}</Descriptions.Item>

        <Descriptions.Item label="Venue">
          {event.venue || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Speaker">
          {event.speaker || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Topic">
          {event.topic || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Branch">
          {event.branch || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Designation">
          {event.designation || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Limit Pax">
          {event.limitPax || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Description">
          {event.description || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Created By">
          {event.createdBy || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Created Date">
          {formatDateTime(event.createdAt) || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Last Modified By">
          {event.lastModifiedBy || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Last Modified Date">
          {formatDateTime(event.lastModifiedAt) || "-"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default EventInfoDetails;
