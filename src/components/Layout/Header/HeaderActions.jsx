import { useState } from "react";
import {
  LockOutlined,
  // UserOutlined,
  // SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import ThemeToggleButton from "./components/ThemeToggleButton";
import NotificationMenu from "./components/NotificationMenu";
import UserMenu from "./components/UserMenu";
import ChangePasswordModal from "../../modals/ChangePasswordModal";

const HeaderActions = () => {
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChangePassword = () => {
    setIsChangePasswordVisible(true);
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
      key: "change-password",
      label: "Change Password",
      icon: <LockOutlined />,
      onClick: handleChangePassword,
    },
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
      <UserMenu items={userMenuItems} userName={user?.username} />
      <ChangePasswordModal
        visible={isChangePasswordVisible}
        onCancel={() => setIsChangePasswordVisible(false)}
      />
    </div>
  );
};

export default HeaderActions;
