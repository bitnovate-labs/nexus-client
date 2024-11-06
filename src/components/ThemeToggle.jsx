import { Button } from "antd"
import { SunOutlined, MoonOutlined } from "@ant-design/icons"
import { useTheme } from "../contexts/ThemeContext"

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <Button
      type="text"
      icon={isDark ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      className="flex items-center justify-center"
    />
  )
}

export default ThemeToggle
