import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("userData");
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      // Generate avatar URL based on username
      parsedUser.avatar = `https://api.dicebear.com/7.x/avatars/svg?seed=${parsedUser.username}`;
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Add avatar URL to user data
    const userWithAvatar = {
      ...userData,
      avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${userData.username}`,
    };
    setUser(userWithAvatar);
    Cookies.set("authToken", userData.token, { expires: 7 });
    Cookies.set("userData", JSON.stringify(userWithAvatar), { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("authToken");
    Cookies.remove("userData");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
