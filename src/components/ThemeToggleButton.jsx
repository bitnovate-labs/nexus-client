import { Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggleButton = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      size="large"
      type="text"
      icon={isDark ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      className="flex items-center justify-center"
    />
  );
};

export default ThemeToggleButton;
