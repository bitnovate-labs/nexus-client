import { Card, Avatar, Typography } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../../graphql/queries/auth";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";
import dayjs from "dayjs";

const { Text } = Typography;

const ProfileCard = () => {
  const { user: authUser } = useAuth();
  const { data: userData } = useQuery(GET_ME);

  const user = userData?.me || {};

  // Use actual avatar URL if available, fallback to generated avatar
  const avatarUrl =
    user.avatarUrl ||
    `https://api.dicebear.com/7.x/avatars/svg?seed=${
      user.name || authUser?.username
    }`;

  const joinDate = dayjs().format("MMM YYYY");

  return (
    <Card
      title="Profile"
      className="dark:bg-gray shadow-lg"
      styles={{
        header: {
          borderBottom: "none",
          paddingBottom: 0,
        },
        body: {
          padding: "24px",
        },
      }}
    >
      <div className="flex flex-col items-center text-center">
        {/* Avatar Section with Upload */}
        <AvatarUpload>
          <Avatar
            size={80}
            src={avatarUrl}
            icon={<UserOutlined />}
            className="cursor-pointer hover:opacity-80 transition-opacity shadow-lg mb-4"
          />
        </AvatarUpload>

        {/* Name and Join Date */}
        <Text className="font-medium text-xl mb-1">
          {user.name || authUser?.username}
        </Text>
        <Text type="secondary" className="text-sm mb-6">
          Joined {joinDate}
        </Text>

        {/* Info Grid */}
        <div className="w-full grid grid-cols-2 gap-4 px-8">
          {/* Left Column - Leader and Recruiter */}
          <div className="text-left">
            <div className="mb-2">
              <Text type="secondary">L:</Text>
              <Text className="ml-2">{user.agent?.leader || "-"}</Text>
            </div>
            <div>
              <Text type="secondary">R:</Text>
              <Text className="ml-2">{user.agent?.recruiter || "-"}</Text>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="text-right">
            <div className="mb-2">
              {user.mobile ? (
                <Text copyable={{ text: user.mobile }}>
                  <PhoneOutlined className="mr-2" />
                  {user.mobile}
                </Text>
              ) : (
                "-"
              )}
            </div>
            <div>
              {user.email ? (
                <Text copyable={{ text: user.email }}>
                  <MailOutlined className="mr-2" />
                  {user.email}
                </Text>
              ) : (
                "-"
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
