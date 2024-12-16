import { Card, Tag } from "antd";
import { PhoneOutlined, TeamOutlined, BankOutlined } from "@ant-design/icons";

const AgentMobileCard = ({ agent, onClick }) => {
  return (
    <Card
      key={agent.id}
      className="mb-4 shadow-md"
      onClick={() => onClick(agent)}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          {/* Agent Name and Display Name */}
          <div>
            <div className="font-medium text-lg">{agent.name}</div>
            <div className="text-gray-500">{agent.displayName}</div>
          </div>
          {/* Agent Status */}
          <Tag color={agent.active ? "success" : "error"}>
            {agent.active ? "Active" : "Inactive"}
          </Tag>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          {/* Agent Branch */}
          <div>
            <div className="flex items-center gap-1 text-gray-500">
              <TeamOutlined />
              <span>Branch</span>
            </div>
            <div>{agent.branch || "-"}</div>
          </div>
          {/* Agent Designation */}
          <div>
            <div className="flex items-center gap-1 text-gray-500">
              <BankOutlined />
              <span>Designation</span>
            </div>
            <div>{agent.designation || "-"}</div>
          </div>
        </div>
        {/* Agent Mobile */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <PhoneOutlined className="text-gray-500" />
            <a href={`tel:${agent.mobile}`}>{agent.mobile || "-"}</a>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Leader</span>
            <TeamOutlined className="text-gray-500" />
            <a href={`mailto:${agent.leader}`}>{agent.leader || "-"}</a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AgentMobileCard;
