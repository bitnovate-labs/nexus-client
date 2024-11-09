import { Layout, Menu } from "antd";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import logoFull from "../../assets/logo-full.svg";
import logoIcon from "../../assets/logo-icon.svg";

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  // Map paths to menu keys
  const pathToKey = {
    "/dashboard": "1",
    "/agent": "2",
  };

  // Get the active key based on current path
  const getActiveKey = () => {
    return pathToKey[location.pathname] || "1"; // '1' is the default 'Dashboard' page view
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Agent Portal",
      onClick: () => navigate("/agent"),
    },
    // Add more menu items here!!!
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className={`dark:bg-gray shadow-md
        [&_.ant-layout-sider-trigger]:!bg-white dark:[&_.ant-layout-sider-trigger]:!bg-gray 
        [&_.ant-menu]:!bg-inherit fixed left-0 top-0 bottom-0 overflow-auto z-20
      `}
      theme={isDark ? "dark" : "light"}
      width={250}
      trigger={isMobile || ""}
    >
      <div className="h-16 mb-10 mt-6 ml-6 md:mt-10 flex flex-col">
        <img
          src={collapsed ? logoIcon : logoFull}
          alt="logo"
          className={`${collapsed ? "w-8" : "w-32"}`}
        />
        <p
          className={`text-gray-400 p-2 text-left ${
            collapsed ? "hidden" : "text-xs"
          }`}
        >
          Version: 2411061530
        </p>
      </div>
      <Menu
        theme={isDark ? "dark" : "light"}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems}
        selectedKeys={[getActiveKey()]}
      />
    </Sider>
  );
};

export default Sidebar;
