import { Card, Row, Col, Statistic } from "antd"
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons"

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Dashboard Overview
      </h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card className="dark:bg-gray-800">
            <Statistic
              title="Total Users"
              value={1234}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="dark:bg-gray-800">
            <Statistic
              title="Total Orders"
              value={789}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="dark:bg-gray-800">
            <Statistic
              title="Revenue"
              value={12345}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
