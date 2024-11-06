import { useState, useEffect } from "react"
import { Layout, Menu, Dropdown, Badge, theme } from "antd"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import ThemeToggle from "../ThemeToggle"

const { Header, Sider, Content } = Layout

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { useToken } = theme
  const { token } = useToken()
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed")
    if (savedCollapsed) {
      setCollapsed(JSON.parse(savedCollapsed))
    }
  }, [])

  const handleCollapse = (value) => {
    setCollapsed(value)
    localStorage.setItem("sidebarCollapsed", JSON.stringify(value))
  }

  const userMenuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        logout()
        navigate("/login")
      },
    },
  ]

  const notifications = [
    {
      key: "1",
      label: "New message received",
    },
    {
      key: "2",
      label: "System update available",
    },
  ]

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="dark:bg-gray-800"
      >
        <div className="p-4 h-8 m-4">
          <h1 className="text-white text-lg font-bold">Dashboard</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Dashboard",
              onClick: () => navigate("/dashboard"),
            },
            // Add more menu items as needed
          ]}
        />
      </Sider>
      <Layout>
        <Header className="p-0 bg-white dark:bg-gray-900 flex items-center justify-between">
          <div className="flex items-center">
            {collapsed ? (
              <MenuUnfoldOutlined
                className="text-xl p-4 cursor-pointer"
                onClick={() => handleCollapse(false)}
              />
            ) : (
              <MenuFoldOutlined
                className="text-xl p-4 cursor-pointer"
                onClick={() => handleCollapse(true)}
              />
            )}
          </div>
          <div className="flex items-center mr-4 gap-4">
            <ThemeToggle />
            <Dropdown
              menu={{
                items: notifications,
              }}
              placement="bottomRight"
              arrow
            >
              <Badge count={notifications.length}>
                <BellOutlined className="text-xl cursor-pointer" />
              </Badge>
            </Dropdown>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <span className="cursor-pointer flex items-center">
                <UserOutlined className="text-xl" />
                <span className="ml-2">{user?.name || "User"}</span>
              </span>
            </Dropdown>
          </div>
        </Header>
        <Content className="m-6 p-6 bg-white dark:bg-gray-900 rounded-lg">
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
