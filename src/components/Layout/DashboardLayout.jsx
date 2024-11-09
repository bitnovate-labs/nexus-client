import { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";
import Header from "./Header/Header";

const { Content } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed");
    if (savedCollapsed && !isMobile) {
      setCollapsed(JSON.parse(savedCollapsed));
    }

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCollapse = (value) => {
    if (!isMobile) {
      setCollapsed(value);
      localStorage.setItem("sidebarCollapsed", JSON.stringify(value));
    }
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <Layout className="min-h-screen">
      {/* Sidebar - Mobile view */}
      {isMobile ? (
        <>
          <Button
            size="large"
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleMobileDrawer}
            className="fixed top-4 left-4 z-50 bg-white dark:bg-gray dark:text-white"
          />
          <Drawer
            placement="left"
            open={mobileDrawerOpen}
            onClose={toggleMobileDrawer}
            closable={false}
            width={250}
            styles={{
              body: {
                padding: 0,
              },
            }}
            className="dark:bg-gray"
            // headerStyle={{ borderBottom: "none" }}
          >
            {/* Custom close button positioned on the right */}
            <Button
              icon={<CloseOutlined />}
              onClick={toggleMobileDrawer}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                border: "none", // No border on the button
                boxShadow: "none", // Remove default button shadow
                zIndex: "1000",
                background: "none",
              }}
            />
            <Sidebar
              collapsed={false}
              onCollapse={() => {}}
              isMobile={true}
              onMobileClose={toggleMobileDrawer}
            />
          </Drawer>
        </>
      ) : (
        // Sidebar - Desktop view
        <Sidebar
          collapsed={collapsed}
          onCollapse={handleCollapse}
          isMobile={false}
        />
      )}
      <Layout
        className={!isMobile ? (collapsed ? "ml-[80px]" : "ml-[250px]") : ""}
      >
        <Header />
        <Content className="p-6 rounded-lg">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
