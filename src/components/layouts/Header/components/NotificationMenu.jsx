import { Dropdown, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";

// Dummy data
import { notifications } from "../../../../dummydata";

const NotificationMenu = () => {
  // const notifications = [];

  const items =
    notifications.length > 0
      ? notifications.map((notification) => ({
          key: notification.key,
          label: notification.label,
        }))
      : [
          {
            key: "empty",
            label: (
              <div className="text-gray-500 py-2 px-1 text-center">
                No new notifications
              </div>
            ),
          },
        ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <div className="cursor-pointer flex items-center">
        {notifications.length > 0 ? (
          <Badge count={notifications.length}>
            <BellOutlined className="text-xl md:text-xl" />
          </Badge>
        ) : (
          <BellOutlined className="text-xl" />
        )}
      </div>
    </Dropdown>
  );
};

export default NotificationMenu;
