ProtectedRoute 
- a wrapper used to check whether a user is authenticated or has the required permissions to access a certain route. 
- it restricts access to certain routes in your application based on conditions like authentication, user roles, or permissions. 
- It ensures that only authorized users can view specific pages while redirecting unauthorized users to another location, such as a login page.
- A ProtectedRoute wraps around your routes and checks conditions (e.g., if a user is authenticated). If the condition passes, it renders the requested route. Otherwise, it redirects the user to a fallback route (like /login).
- ProtectedRoute should be placed at the ROUTE LEVEL (inside App.jsx) because it directly relates to controlling access to individual routes. 

Advanced Features:
- depending on the requirements of the application, this component can be extended to:

1. User Roles - restrict routes based on user roles (ex: admin, editor, etc..)
-----------------------------------------------------------------------------------------
const ProtectedRoute = ({ isAuthenticated, userRole, requiredRole, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};
-----------------------------------------------------------------------------------------

2. Custom Redirects - allow flexible redirects by passing a redirectPath prop
-----------------------------------------------------------------------------------------
const ProtectedRoute = ({ isAuthenticated, redirectPath = "/login", children }) => {
  return isAuthenticated ? children : <Navigate to={redirectPath} />;
};
-----------------------------------------------------------------------------------------

3. Preserving State - pass the current location to the login page for redirecting back after login
-----------------------------------------------------------------------------------------
import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};
-----------------------------------------------------------------------------------------


If you want to make the ProtectedRoute logic cleaner and more reusable, you could abstract it further by creating a protected route wrapper for certain route groups.

For example, if you have multiple routes that need protection under the same layout (like all dashboard-related routes), you could group them into a layout and apply the protection logic there:

```
return (
    <AuthProvider>
      <ConfigProvider theme={themeConfig}>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protecting all routes under DashboardLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/user-account" element={<UserAccount />} />
            </Route>
          </Route>

          <Route path="/banks" element={<Banks />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ConfigProvider>
    </AuthProvider>
  );

```
Testability:
- Keep the logic clean and easy to test by passing props for conditions like isAuthenticated and redirectPath.

Example:
- Standard code block 
```

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;

```

