import { useState, useEffect } from "react";
import { Layout as AntLayout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";
import Header from "./Header/Header";

const { Content } = AntLayout;

const MainContent = ({ title, children }) => {
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

  // HANDLE SIDEBAR OPEN/CLOSE
  const handleCollapse = (value) => {
    if (!isMobile) {
      setCollapsed(value);
      localStorage.setItem("sidebarCollapsed", JSON.stringify(value));
    }
  };

  // HANDLE MOBILE DRAWER OPEN/CLOSE
  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <AntLayout className="min-h-screen">
      {/* SIDEBAR LAYOUT - MOBILE VIEW */}
      {isMobile ? (
        <>
          <Button
            size="large"
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleMobileDrawer}
            className="fixed top-4 left-4 z-50 bg-white dark:bg-gray dark:text-white"
          />
          {/* SIDEBAR BACKGROUND OVERLAY */}
          <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
              mobileDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleMobileDrawer}
          />
          {/* SIDEBAR Sliding Panel */}
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
        // SIDEBAR LAYOUT - DESKTOP VIEW
        <Sidebar
          collapsed={collapsed}
          onCollapse={handleCollapse}
          isMobile={false}
        />
      )}
      <AntLayout
        className={!isMobile ? (collapsed ? "ml-[80px]" : "ml-[220px]") : ""}
      >
        <Header /> {/* APPLICATION HEADER */}
        {/* APPLICATION BODY */}
        <Content className="p-4">
          {/* PAGE TITLE */}
          <div className="flex flex-col md:flex-row justify-between items-center pb-4 md:pb-2">
            <h1 className="text-2xl font-bold ml-2">{title}</h1>
          </div>
          {children} {/* PAGE CONTENT */}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default MainContent;
