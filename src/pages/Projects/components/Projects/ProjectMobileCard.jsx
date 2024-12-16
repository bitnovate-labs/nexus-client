import { Card, Tag } from "antd";
import {
  HomeOutlined,
  BankOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const ProjectMobileCard = ({ project, onClick }) => {
  return (
    <Card
      key={project.id}
      className="mb-4 shadow-md"
      onClick={() => onClick(project)}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium text-lg">{project.name}</div>
            <div className="text-gray-500">{project.company}</div>
          </div>
          <Tag color={project.active ? "success" : "error"}>
            {project.active ? "Active" : "Inactive"}
          </Tag>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="flex items-center gap-1 text-gray-500">
              <HomeOutlined />
              <span>Developer</span>
            </div>
            <div>{project.developer?.name || "-"}</div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-gray-500">
              <GlobalOutlined />
              <span>State</span>
            </div>
            <div>{project.state?.name || "-"}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <BankOutlined className="text-gray-500" />
          <span>Developer Pay Tax:</span>
          <Tag color={project.developerPayTax ? "green" : "red"}>
            {project.developerPayTax ? "Yes" : "No"}
          </Tag>
        </div>

        {project.description && (
          <div className="flex items-start gap-2 text-sm">
            <InfoCircleOutlined className="text-gray-500 mt-1" />
            <div className="flex-1 text-gray-600">{project.description}</div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectMobileCard;
