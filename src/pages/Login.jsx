import { Form, Input, Button, Checkbox } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

import ConnexLogo from "../assets/Connex_Logo.svg"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  // Temporary login ID and password
  const onFinish = (values) => {
    if (values.username === "admin" && values.password === "password") {
      login({
        name: "Admin User",
        token: "mock-jwt-token",
        username: values.username,
      })
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome To Connexus Portal
            </h1>
            <p className="text-gray-600">Enter your details to proceed.</p>
          </div>

          <Form
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
              <Input placeholder="Username" className="h-12 text-base" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className="h-12 text-base"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            {/* This code is reserved for potential future use */}
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
                className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 mt-6"
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
                  className="mr-2"
                />
                Connexus Group
              </span>
            </div>
          </Form>
        </div>
      </div>

      {/* Right Section - Blue Background */}
      <div className="hidden md:block w-1/2 bg-blue-600"></div>
    </div>
  )
}

export default Login
