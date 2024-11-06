import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { ConfigProvider, theme } from "antd"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import DashboardLayout from "./components/Layout/DashboardLayout"
import { useAuth } from "./contexts/AuthContext"
import { useTheme } from "./contexts/ThemeContext"
import "./index.css"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

const AppContent = () => {
  const { isDark } = useTheme()

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ConfigProvider>
  )
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
