import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import ThemeToggleButton from "../../ThemeToggleButton";
import NotificationMenu from "./NotificationMenu";
import UserMenu from "./UserMenu";

const HeaderActions = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userMenuItems = [
    // Commented codes are reserved for potential future use
    // {
    //   key: "profile",
    //   label: "Profile",
    //   icon: <UserOutlined />,
    // },
    // {
    //   key: "settings",
    //   label: "Settings",
    //   icon: <SettingOutlined />,
    // },
    // {
    //   type: "divider",
    // },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="flex items-center mr-4 gap-4">
      {/* Light Dark Theme Button */}
      <ThemeToggleButton />
      {/* Notification Icon */}
      <NotificationMenu />
      {/* User Profile Icon */}
      <UserMenu items={userMenuItems} userName={user?.name} />
    </div>
  );
};

export default HeaderActions;
