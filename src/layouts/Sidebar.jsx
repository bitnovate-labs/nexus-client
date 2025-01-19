import { Layout, Menu } from "antd";
import {
  BankOutlined,
  BarChartOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  ClusterOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  FundOutlined,
  FundProjectionScreenOutlined,
  GlobalOutlined,
  HomeOutlined,
  LineChartOutlined,
  PieChartOutlined,
  ProjectOutlined,
  RiseOutlined,
  SettingOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  StopOutlined,
  TagOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@contexts/ThemeContext";
import logoFull from "@assets/logo-full.svg";
import logoIcon from "@assets/logo-icon.svg";

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse, isMobile, onMobileItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  // Get the base path for active menu highlighting
  const getActivePath = (pathname) => {
    const basePath = pathname.split("/")[1];
    return `/${basePath}`;
  };

  // SIDEBAR MENU ITEMS
  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => handleMenuClick("/dashboard"),
    },
    {
      key: "/events",
      icon: <CalendarOutlined />,
      label: "Events",
      onClick: () => handleMenuClick("/events"),
    },
    {
      key: "/memo",
      icon: <FileTextOutlined />,
      label: "Memo",
      onClick: () => handleMenuClick("/memo"),
    },
    {
      key: "/developers",
      icon: <HomeOutlined />,
      label: "Developers",
      onClick: () => handleMenuClick("/developers"),
    },
    // {
    //   key: "/projects",
    //   icon: <ProjectOutlined />,
    //   label: "Projects",
    //   onClick: () => handleMenuClick("/projects"),
    // },
    {
      key: "/agents",
      icon: <UserOutlined />,
      label: "Agents",
      onClick: () => handleMenuClick("/agents"),
    },
    // {
    //   key: "/sales",
    //   icon: <ShoppingOutlined />,
    //   label: "Sales",
    //   onClick: () => handleMenuClick("/sales"),
    // },
    // {
    //   key: "/reports",
    //   icon: <BarChartOutlined />,
    //   label: "Reports",
    //   children: [
    //     {
    //       key: "/reports/commission_summary",
    //       icon: <PieChartOutlined />,
    //       label: "Commission Summary",
    //       onClick: () => handleMenuClick("/reports/commission_summary"),
    //     },
    //     {
    //       key: "/reports/commission_outstanding",
    //       icon: <ExclamationCircleOutlined />,
    //       label: "Commission Outstanding",
    //       onClick: () => handleMenuClick("/reports/commission_outstanding"),
    //     },
    //     {
    //       key: "/reports/personal_sales",
    //       icon: <UserOutlined />,
    //       label: "Personal Sales",
    //       onClick: () => handleMenuClick("/reports/personal_sales"),
    //     },
    //     {
    //       key: "/reports/group_sales",
    //       icon: <TeamOutlined />,
    //       label: "Group Sales",
    //       onClick: () => handleMenuClick("/reports/group_sales"),
    //     },
    //     {
    //       key: "/reports/project_personal_sales",
    //       icon: <FundOutlined />,
    //       label: "Project Personal Sales",
    //       onClick: () => handleMenuClick("/reports/project_personal_sales"),
    //     },
    //     {
    //       key: "/reports/project_total_sales",
    //       icon: <LineChartOutlined />,
    //       label: "Project Total Sales",
    //       onClick: () => handleMenuClick("/reports/project_total_sales"),
    //     },
    //     {
    //       key: "/reports/withholding_tax",
    //       icon: <CalculatorOutlined />,
    //       label: "Withholding Tax",
    //       onClick: () => handleMenuClick("/reports/withholding_tax"),
    //     },
    //     {
    //       key: "/reports/agent_hierarchy",
    //       icon: <ClusterOutlined />,
    //       label: "Agent Hierarchy",
    //       onClick: () => handleMenuClick("/reports/agent_hierarchy"),
    //     },
    //     {
    //       key: "/reports/agent_promotion",
    //       icon: <RiseOutlined />,
    //       label: "Agent Promotion",
    //       onClick: () => handleMenuClick("/reports/agent_promotion"),
    //     },
    //     {
    //       key: "/reports/inactive_agent",
    //       icon: <StopOutlined />,
    //       label: "Inactive Agent",
    //       onClick: () => handleMenuClick("/reports/inactive_agent"),
    //     },
    //     {
    //       key: "/reports/actual_personal_report",
    //       icon: <SolutionOutlined />,
    //       label: "Actual Personal Report",
    //       onClick: () => handleMenuClick("/reports/actual_personal_report"),
    //     },
    //     {
    //       key: "/reports/actual_group_sales",
    //       icon: <FundProjectionScreenOutlined />,
    //       label: "Actual Group Sales",
    //       onClick: () => handleMenuClick("/reports/actual_group_sales"),
    //     },
    //   ],
    // },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        {
          key: "/banks",
          icon: <BankOutlined />,
          label: "Banks",
          onClick: () => handleMenuClick("/banks"),
        },
        {
          key: "/designations",
          icon: <TagOutlined />,
          label: "Designations",
          onClick: () => handleMenuClick("/designations"),
        },
        {
          key: "/events-settings",
          icon: <CalendarOutlined />,
          label: "Event",
          onClick: () => handleMenuClick("/events-settings"),
        },
        {
          key: "/memo-settings",
          icon: <FileTextOutlined />,
          label: "Memo",
          onClick: () => handleMenuClick("/memo-settings"),
        },
        {
          key: "/user-roles",
          icon: <TeamOutlined />,
          label: "User Account Role",
          onClick: () => handleMenuClick("/user-roles"),
        },
        {
          key: "/user-account",
          icon: <UserOutlined />,
          label: "User Account",
          onClick: () => handleMenuClick("/user-account"),
        },
        {
          key: "/states",
          icon: <GlobalOutlined />,
          label: "States",
          onClick: () => handleMenuClick("/states"),
        },
      ],
    },
    // Add more menu items here!!!
  ];

  // HANDLE MENU CLICK
  const handleMenuClick = (e) => {
    navigate(e.key);
    // Only trigger mobile close if it's a mobile view and there's a close handler
    if (isMobile && onMobileItemClick) {
      onMobileItemClick();
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className={`dark:bg-gray md:shadow-md
        [&_.ant-layout-sider-trigger]:!bg-white dark:[&_.ant-layout-sider-trigger]:!bg-gray 
        [&_.ant-menu]:!bg-inherit fixed left-0 top-0 bottom-0 overflow-auto z-20
      `}
      theme={isDark ? "dark" : "light"}
      width={220}
      trigger={isMobile || ""}
    >
      {/* SIDEBAR TITLE */}
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
          {/* TO BE REMOVED LATER!! */}
          {/* Version: 2411061530 */}
          {/* Version: 2501171521 */}
          Version: {`${_APP_VERSION_}`}
        </p>
      </div>

      {/* SIDEBAR MENU */}
      <Menu
        theme={isDark ? "dark" : "light"}
        mode="inline"
        defaultSelectedKeys={["/"]}
        items={menuItems}
        selectedKeys={[getActivePath(location.pathname)]}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default Sidebar;
