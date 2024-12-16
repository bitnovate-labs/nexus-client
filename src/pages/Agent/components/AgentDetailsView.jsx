import { Descriptions, Typography, Tag, Button } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  BankOutlined,
  IdcardOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { formatDate } from "../../../utils/dateUtils";
import AgentAvatar from "./AgentAvatar";

const { Text, Title } = Typography;

const AgentDetailsView = ({ agent, section, onEdit }) => {
  if (!agent) return null;

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <AgentAvatar agent={agent} />
          <div>
            <Title level={4} className="!mb-0">
              {agent.name}
            </Title>
            <Text type="secondary">{agent.designation}</Text>
          </div>
        </div>
        <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
          Edit
        </Button>
      </div>

      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Display Name">
          {agent.displayName || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="NRIC/Passport">
          {agent.nricPassport || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <div className="flex items-center gap-2">
            <MailOutlined />
            {agent.email ? (
              <a href={`mailto:${agent.email}`}>{agent.email}</a>
            ) : (
              "-"
            )}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Mobile">
          <div className="flex items-center gap-2">
            <PhoneOutlined />
            {agent.mobile ? (
              <a href={`tel:${agent.mobile}`}>{agent.mobile}</a>
            ) : (
              "-"
            )}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {agent.address || "-"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderBankingInfo = () => (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
          Edit
        </Button>
      </div>
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Bank">
          <div className="flex items-center gap-2">
            <BankOutlined />
            {agent.bank || "-"}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Account No">
          {agent.bankAccountNo || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Payee Name">
          {agent.payeeName || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Payee NRIC">
          {agent.payeeNric || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="SWIFT Code">
          {agent.swiftCode || "-"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderRenTag = () => (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
          Edit
        </Button>
      </div>
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="REN No">
          <div className="flex items-center gap-2">
            <IdcardOutlined />
            {agent.renNo || "-"}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="REN License">
          {agent.renLicense || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="REN Expired Date">
          {formatDate(agent.renExpiredDate) || "-"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderGeneralInfo = () => (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
          Edit
        </Button>
      </div>
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Branch">
          {agent.branch || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Leader">
          {agent.leader || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Recruiter">
          {agent.recruiter || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Commission">
          {typeof agent.commissionPercentage === "number"
            ? `${agent.commissionPercentage}%`
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Join Date">
          {formatDate(agent.joinDate) || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Resign Date">
          {formatDate(agent.resignDate) || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Income Tax No">
          {agent.incomeTaxNo || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <div className="space-x-2">
            <Tag color={agent.active ? "success" : "error"}>
              {agent.active ? "Active" : "Inactive"}
            </Tag>
            {agent.withholdingTax && <Tag color="warning">Withholding Tax</Tag>}
            {agent.leaderboard && <Tag color="processing">Leaderboard</Tag>}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Remark">
          {agent.remark || "-"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const sectionMap = {
    personal: renderPersonalInfo,
    banking: renderBankingInfo,
    ren: renderRenTag,
    general: renderGeneralInfo,
  };

  return sectionMap[section]?.() || null;
};

export default AgentDetailsView;
