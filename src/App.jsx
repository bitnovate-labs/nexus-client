import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { AuthProvider } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";
import "./index.css";

import SessionExpirationHandler from "./components/auth/SessionExpirationHandler.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

// MainContent to wrap pages
import MainContent from "./layouts/MainContent.jsx";

// Pages
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
// import DebitNote from "./pages/Finance/DebitNote.jsx"; -- excluded by Sean
// import CreditNote from "./pages/Finance/CreditNote.jsx"; -- excluded by Sean
// import Receipt from "./pages/Finance/Receipt.jsx"; -- excluded by Sean
// import Invoice from "./pages/Finance/Invoice.jsx"; -- excluded by Sean
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
import Memo from "./pages/Memo/Memo.jsx";
import MemoSettings from "./pages/Memo/MemoSettings.jsx";

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

  // REPORTS SUBMENU ROUTES HERE - for cleaner code
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
        {/* SESSION EXPIRATION HANDLER */}
        <SessionExpirationHandler />
        <Routes>
          {/* LOGIN */}
          <Route path="/login" element={<Login />} />
          {/* Redirects users to the dashboard route if no routes are available */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainContent title="Dashboard Overview">
                  <Dashboard />
                </MainContent>
              </ProtectedRoute>
            }
          />
          {/* EVENTS */}
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <MainContent title="Events">
                  <Events />
                </MainContent>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <MainContent>
                  <EventInfo />
                </MainContent>
              </ProtectedRoute>
            }
          />
          {/* MEMO */}
          <Route
            path="/memo"
            element={
              <ProtectedRoute>
                <MainContent title="Memo">
                  <Memo />
                </MainContent>
              </ProtectedRoute>
            }
          />
          {/* DEVELOPERS */}
          <Route
            path="/developers"
            element={
              <ProtectedRoute>
                <MainContent title="Developers">
                  <Developers />
                </MainContent>
              </ProtectedRoute>
            }
          />
          {/* PROJECTS */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <MainContent>
                  <Projects />
                </MainContent>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <MainContent>
                  <ProjectDetails />
                </MainContent>
              </ProtectedRoute>
            }
          />
          {/* AGENTS */}
          <Route
            path="/agents"
            element={
              <ProtectedRoute>
                <MainContent title="Agents">
                  <Agent />
                </MainContent>
              </ProtectedRoute>
            }
          />
          {/* SALES */}
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <MainContent title="Title">
                  <Sales />
                </MainContent>
              </ProtectedRoute>
            }
          />
          {/* REPORTS */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <MainContent>
                  <Reports />
                </MainContent>
              </ProtectedRoute>
            }
          />
          {/* REPORT SUB-MENUS */}
          {reportRoutes.map(({ path, component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <MainContent>{component}</MainContent>
                </ProtectedRoute>
              }
            />
          ))}
          {/* ------------------------------------------------- */}
          {/* SETTINGS */}
          <Route
            path="/banks"
            element={
              <ProtectedRoute>
                <MainContent title="Banks">
                  <Banks />
                </MainContent>
              </ProtectedRoute>
            }
          />
          <Route
            path="/designations"
            element={
              <ProtectedRoute>
                <MainContent title="Designations">
                  <Designations />
                </MainContent>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events-settings"
            element={
              <ProtectedRoute>
                <MainContent title="Event">
                  <EventsSettings />
                </MainContent>
              </ProtectedRoute>
            }
          />
          <Route
            path="/memo-settings"
            element={
              <ProtectedRoute>
                <MainContent title="Memo">
                  <MemoSettings />
                </MainContent>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-roles"
            element={
              <ProtectedRoute>
                <MainContent title="User Account Role">
                  <UserRoles />
                </MainContent>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-account"
            element={
              <ProtectedRoute>
                <MainContent title="User Account">
                  <UserAccount />
                </MainContent>
              </ProtectedRoute>
            }
          />
          <Route
            path="/states"
            element={
              <ProtectedRoute>
                <MainContent title="States">
                  <States />
                </MainContent>
              </ProtectedRoute>
            }
          />
          {/* TO BE REMOVED LATER */}
          {/* <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <MainContent>
                  <Invoice />
                </MainContent>
              </ProtectedRoute>
            }
          /> */}
          {/* TO BE REMOVED LATER */}
          {/* <Route
            path="/receipt"
            element={
              <ProtectedRoute>
                <MainContent>
                  <Receipt />
                </MainContent>
              </ProtectedRoute>
            }
          /> */}
          {/* TO BE REMOVED LATER */}
          {/* <Route
            path="/credit-note"
            element={
              <ProtectedRoute>
                <MainContent>
                  <CreditNote />
                </MainContent>
              </ProtectedRoute>
            }
          /> */}
          {/* TO BE REMOVED LATER */}
          {/* <Route
            path="/debit-note"
            element={
              <ProtectedRoute>
                <MainContent>
                  <DebitNote />
                </MainContent>
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </ConfigProvider>
    </AuthProvider>
  );
};

export default App;
