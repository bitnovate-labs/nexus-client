import { Form, Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Navigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../hooks/useAuth";

import ConnexLogo from "../../assets/Connex_Logo.svg";
import SectionImage from "../../assets/isometric-building.png";
import SectionLogo from "../../assets/Connex_Logo2.svg";

const Login = () => {
  const { login, user } = useAuth();
  const { isDark } = useTheme();
  const [form] = Form.useForm();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const onFinish = (values) => {
    if (values.username && values.password) {
      login(values.username, values.password);
    } else {
      message.error("Invalid username or password");
      form.setFields([
        {
          name: "password",
          errors: ["Incorrect username or password"],
        },
      ]);
    }
  };

  return (
    <div className={`min-h-screen flex md:flex-row ${isDark ? "dark" : ""}`}>
      {/* Left Section */}
      <div
        className={`w-full md:w-1/2 p-8 flex items-center justify-center ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1
              className={`text-2xl font-semibold text-center md:text-left ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome To Connexus Portal
            </h1>
            <p
              className={`text-center md:text-left ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Enter your details to proceed.
            </p>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Username"
                className={`h-12 text-base ${
                  isDark ? "bg-gray-800 border-gray-700 text-white" : ""
                }`}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className={`h-12 text-base ${
                  isDark ? "bg-gray-800 border-gray-700 text-white" : ""
                }`}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            {/* CODE BLOCK FOR FUTURE USE */}
            {/* --------------------------------------------------- */}
            {/* <div className="flex items-center justify-between">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="mb-0"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Forgot your password?
              </a>
            </div> */}
            {/* --------------------------------------------------- */}

            <Form.Item className="mb-2">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 text-base bg-blue hover:bg-blue-700 mt-6"
              >
                Log In
              </Button>
            </Form.Item>

            <div className="flex justify-center">
              <p className="text-center text-gray-600 mr-4">Powered by </p>
              <span className="flex justify-center items-center">
                <img
                  src={ConnexLogo}
                  height={15}
                  width={15}
                  alt="logo"
                  // className="mr-2"
                  className={`mr-2 ${
                    isDark
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                />
                Connexus Group
              </span>
            </div>
          </Form>
        </div>
      </div>

      {/* Right Section - Blue Background */}
      <div className="hidden md:block w-1/2 bg-blue dark:bg-white relative">
        <div className="flex flex-col items-center my-20">
          <img
            src={SectionImage}
            style={{ height: "500px", width: "auto" }}
            alt="section_image"
          />
          <img src={SectionLogo} height={150} width={150} alt="section_logo" />
          <h1 className="text-4xl font-bold text-center leading-10 text-white dark:text-gray-800 mt-8">
            One Platform, <br /> Endless Possibilities{" "}
          </h1>
          <div className="absolute inset-0 bg-blue bg-opacity-30 dark:bg-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
