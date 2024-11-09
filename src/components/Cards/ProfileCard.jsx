import { Card, Avatar, Typography } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";

const { Text } = Typography;

const ProfileCard = () => {
  const { user } = useAuth();

  // Mock data - use as fallback
  const defaultData = {
    name: "Ho Chuan Wei",
    displayName: "Wayne Ho Chuan Wei",
    joinDate: "2023-01-15",
    leader: "Gen Lee",
    recruiter: "John Smith",
    mobile: "014-6229525",
    email: "wayne.ho@example.com",
    downlineCount: {
      left: 5,
      right: 3,
    },
  };

  // Combine user data with default data
  const profileData = {
    ...defaultData,
    ...user,
    name: user?.name || defaultData.name,
    avatar:
      user?.avatar ||
      `https://api.dicebear.com/7.x/avatars/svg?seed=${defaultData.name}`,
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const handleAvatarClick = () => {
    // TODO: Implement avatar click action (e.g., open profile modal)
    console.log("Avatar clicked");
  };

  return (
    <Card
      title="Profile"
      className="dark:bg-gray h-full md:pb-10 lg:pb-0 shadow-lg"
      styles={{
        header: {
          borderBottom: "none",
          paddingBottom: 0,
          padding: "20px 30px 0 30px",
        },
        body: {
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
      }}
    >
      <div className="flex gap-4 pb-4 px-4 md:pb-0 md:flex-col md:items-center md:text-center">
        {/* Avatar Section */}
        <Avatar
          size={64}
          src={profileData.avatar}
          icon={<UserOutlined />}
          className="cursor-pointer hover:opacity-80 transition-opacity shadow-lg flex-shrink-0"
          onClick={handleAvatarClick}
        />

        {/* Info Section */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2 mb-4">
            <Text className="font-medium text-xl truncate">
              {profileData.name}
            </Text>
            <Text type="secondary" className="text-sm">
              Joined {formatDate(profileData.joinDate)}
            </Text>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {/* Leader and Recruiter */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Text type="secondary" className="w-6">
                  L:
                </Text>
                <Text className="truncate flex-1">{profileData.leader}</Text>
              </div>
              <div className="flex items-center gap-2">
                <Text type="secondary" className="w-6">
                  R:
                </Text>
                <Text className="truncate flex-1">{profileData.recruiter}</Text>
              </div>
            </div>
            {/* Contact Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <PhoneOutlined className="text-gray-400 w-6" />
                <Text className="truncate flex-1">{profileData.mobile}</Text>
              </div>
              <div className="flex items-center gap-2">
                <MailOutlined className="text-gray-400 w-6" />
                <Text className="truncate flex-1" title={profileData.email}>
                  {profileData.email}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
