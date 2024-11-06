import { createContext, useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get("authToken")
    const userData = Cookies.get("userData")
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    Cookies.set("authToken", userData.token, { expires: 7 })
    Cookies.set("userData", JSON.stringify(userData), { expires: 7 })
  }

  const logout = () => {
    setUser(null)
    Cookies.remove("authToken")
    Cookies.remove("userData")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
