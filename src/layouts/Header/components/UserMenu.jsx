import { Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { useAuth } from "@hooks/useAuth";
import { GET_ME } from "@graphql/queries/auth";
import AvatarUpload from "@components/AvatarUpload/AvatarUpload";

const UserMenu = ({ items }) => {
  const { user: authUser } = useAuth();
  const { data: userData } = useQuery(GET_ME);

  const user = userData?.me || {};
  // Use actual avatar URL if available, fallback to generated avatar
  const avatarUrl =
    user.avatarUrl ||
    `https://api.dicebear.com/7.x/avatars/svg?seed=${
      user.name || authUser?.username
    }`;
  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <span className="cursor-pointer flex items-center gap-2 ml-4">
        {/* <Avatar
          size="default"
          src="https://api.dicebear.com/9.x/pixel-art/svg" // To insert user profile pic here!
          className="bg-blue"
        /> */}
        <AvatarUpload>
          <Avatar
            size={30}
            src={avatarUrl}
            icon={<UserOutlined />}
            className="cursor-pointer hover:opacity-80 transition-opacity shadow-lg"
          />
        </AvatarUpload>
        <span className="hidden md:inline w-32 px-4">
          {user.name || authUser?.username}
        </span>
      </span>
    </Dropdown>
  );
};

export default UserMenu;
