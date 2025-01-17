import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { AuthProvider } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";
import "./index.css";

import SessionExpirationHandler from "./components/auth/SessionExpirationHandler.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Layout from "./components/layouts/Layout.jsx";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Agent from "./pages/Agent/Agent.jsx";
import UserAccount from "./pages/UserAccount/UserAccount.jsx";
import UserRoles from "./pages/UserRoles/UserRoles.jsx";
import Banks from "./pages/Banks/Banks.jsx";
import Designations from "./pages/Designation/Designations.jsx";
import Developers from "./pages/Developers/Developers.jsx";
import States from "./pages/States/States.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import ProjectDetails from "./pages/Projects/ProjectDetails.jsx";
import DebitNote from "./pages/Finance/DebitNote.jsx";
import CreditNote from "./pages/Finance/CreditNote.jsx";
import Receipt from "./pages/Finance/Receipt.jsx";
import Invoice from "./pages/Finance/Invoice.jsx";
import Sales from "./pages/Sales/Sales.jsx";
import Reports from "./pages/Reports/Reports.jsx";
import ActualGroupSales from "./pages/Reports/submenu/ActualGroupSales.jsx";
import ActualPersonalReport from "./pages/Reports/submenu/ActualPersonalReport.jsx";
import InactiveAgent from "./pages/Reports/submenu/InactiveAgent.jsx";
import AgentPromotion from "./pages/Reports/submenu/AgentPromotion.jsx";
import AgentHierarchy from "./pages/Reports/submenu/AgentHierarchy.jsx";
import WithholdingTax from "./pages/Reports/submenu/WithholdingTax.jsx";
import ProjectTotalSales from "./pages/Reports/submenu/ProjectTotalSales.jsx";
import ProjectPersonalSales from "./pages/Reports/submenu/ProjectPersonalSales.jsx";
import GroupSales from "./pages/Reports/submenu/GroupSales.jsx";
import PersonalSales from "./pages/Reports/submenu/PersonalSales.jsx";
import CommissionOutstanding from "./pages/Reports/submenu/CommissionOutstanding.jsx";
import CommissionSummary from "./pages/Reports/submenu/CommissionSummary.jsx";
import Events from "./pages/Events/Events.jsx";
import EventsSettings from "./pages/Events/EventSettings.jsx";
import EventInfo from "./pages/Events/EventInfo.jsx";

const App = () => {
  const { isDark } = useTheme() || {};

  // Ant Design Global Token config
  const themeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#004DFF",
    },
    components: {
      Table: {
        headerBg: isDark ? "#191D23" : "#FFFFFF",
      },
    },
  };

  // Reports submenu routes for cleaner code
  const reportRoutes = [
    { path: "/reports/commission_summary", component: <CommissionSummary /> },
    {
      path: "/reports/commission_outstanding",
      component: <CommissionOutstanding />,
    },
    { path: "/reports/personal_sales", component: <PersonalSales /> },
    { path: "/reports/group_sales", component: <GroupSales /> },
    {
      path: "/reports/project_personal_sales",
      component: <ProjectPersonalSales />,
    },
    { path: "/reports/project_total_sales", component: <ProjectTotalSales /> },
    { path: "/reports/withholding_tax", component: <WithholdingTax /> },
    { path: "/reports/agent_hierarchy", component: <AgentHierarchy /> },
    { path: "/reports/agent_promotion", component: <AgentPromotion /> },
    { path: "/reports/inactive_agent", component: <InactiveAgent /> },
    {
      path: "/reports/actual_personal_report",
      component: <ActualPersonalReport />,
    },
    { path: "/reports/actual_group_sales", component: <ActualGroupSales /> },
  ];

  return (
    <AuthProvider>
      <ConfigProvider theme={themeConfig}>
        <SessionExpirationHandler />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Redirects users to the dashboard route if no routes are available */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Layout>
                  <Events />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <EventInfo />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events-settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <EventsSettings />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/agents"
            element={
              <ProtectedRoute>
                <Layout>
                  <Agent />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-account"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserAccount />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/banks"
            element={
              <ProtectedRoute>
                <Layout>
                  <Banks />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/designations"
            element={
              <ProtectedRoute>
                <Layout>
                  <Designations />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/developers"
            element={
              <ProtectedRoute>
                <Layout>
                  <Developers />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/states"
            element={
              <ProtectedRoute>
                <Layout>
                  <States />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-roles"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserRoles />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Layout>
                  <Projects />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProjectDetails />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <Layout>
                  <Invoice />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/receipt"
            element={
              <ProtectedRoute>
                <Layout>
                  <Receipt />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/credit-note"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreditNote />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/debit-note"
            element={
              <ProtectedRoute>
                <Layout>
                  <DebitNote />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <Layout>
                  <Sales />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Report submenus */}
          {reportRoutes.map(({ path, component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <Layout>{component}</Layout>
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </ConfigProvider>
    </AuthProvider>
  );
};

export default App;
