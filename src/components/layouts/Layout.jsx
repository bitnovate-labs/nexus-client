import { useState, useEffect } from "react";
import { Layout as AntLayout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";
import Header from "./Header/Header";

const { Content } = AntLayout;

const Layout = ({ children }) => {
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
    <AntLayout className="min-h-screen">
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
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
              mobileDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleMobileDrawer}
          />
          {/* Sliding Panel */}
          <div
            className={`fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray z-50 transform transition-transform duration-300 ${
              mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar
              collapsed={false}
              onCollapse={handleCollapse}
              isMobile={true}
              onMobileItemClick={() => setMobileDrawerOpen(false)}
            />
          </div>
        </>
      ) : (
        // Sidebar - Desktop view
        <Sidebar
          collapsed={collapsed}
          onCollapse={handleCollapse}
          isMobile={false}
        />
      )}
      <AntLayout
        className={!isMobile ? (collapsed ? "ml-[80px]" : "ml-[250px]") : ""}
      >
        <Header />
        <Content className="p-6 rounded-lg">{children}</Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
