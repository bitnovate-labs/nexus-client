import { Drawer, Tabs, Descriptions, Avatar, Typography, Tag } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const AgentDetailsDrawer = ({ open, onClose, agent }) => {
  if (!agent) return null;

  const items = [
    {
      key: "1",
      label: "Personal Info",
      children: (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar size={64} src={agent.avatar} icon={<UserOutlined />} />
            <div>
              <Title level={4} className="!mb-0">
                {agent.name}
              </Title>
              <Text type="secondary">{agent.designation}</Text>
            </div>
          </div>

          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Display Name">
              {agent.displayName}
            </Descriptions.Item>
            <Descriptions.Item label="NRIC/Passport">
              {agent.nricPassport}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <div className="flex items-center gap-2">
                <MailOutlined />
                <a href={`mailto:${agent.email}`}>{agent.email}</a>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Mobile">
              <div className="flex items-center gap-2">
                <PhoneOutlined />
                <a href={`tel:${agent.mobile}`}>{agent.mobile}</a>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {agent.address}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ),
    },
    {
      key: "2",
      label: "Banking Info",
      children: (
        <div className="space-y-6">
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Bank">
              <div className="flex items-center gap-2">
                <BankOutlined />
                {agent.bank}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Account No">
              {agent.bankAccountNo}
            </Descriptions.Item>
            <Descriptions.Item label="Payee Name">
              {agent.payeeName}
            </Descriptions.Item>
            <Descriptions.Item label="Payee NRIC">
              {agent.payeeNRIC}
            </Descriptions.Item>
            <Descriptions.Item label="SWIFT Code">
              {agent.swiftCode}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ),
    },
    {
      key: "3",
      label: "General Info",
      children: (
        <div className="space-y-6">
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Branch">{agent.branch}</Descriptions.Item>
            <Descriptions.Item label="Upline">{agent.upline}</Descriptions.Item>
            <Descriptions.Item label="Sponsor">
              {agent.sponsor}
            </Descriptions.Item>
            <Descriptions.Item label="Commission">
              {agent.commission}%
            </Descriptions.Item>
            <Descriptions.Item label="Join Date">
              {agent.joinDate}
            </Descriptions.Item>
            <Descriptions.Item label="Income Tax No">
              {agent.incomeTaxNo}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <div className="space-x-2">
                <Tag color={agent.active ? "success" : "error"}>
                  {agent.active ? "Active" : "Inactive"}
                </Tag>
                {agent.withholdingTax && (
                  <Tag color="warning">Withholding Tax</Tag>
                )}
                {agent.leaderboard && <Tag color="processing">Leaderboard</Tag>}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Remark">{agent.remark}</Descriptions.Item>
          </Descriptions>
        </div>
      ),
    },
  ];

  return (
    <Drawer
      title="Agent Details"
      placement="right"
      onClose={onClose}
      open={open}
      width={640}
      className="agent-details-drawer"
    >
      <Tabs items={items} defaultActiveKey="1" className="h-full" />
    </Drawer>
  );
};

export default AgentDetailsDrawer;
