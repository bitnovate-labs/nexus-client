import { Card, Descriptions, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";
import { formatDateTime } from "../../../../utils/dateUtils";

const ProjectInfo = ({ project }) => {
  if (!project) return null;

  return (
    <Card title="Project Info" className="shadow-md h-auto">
      <Descriptions column={1} bordered size="small">
        {/* Company */}
        <Descriptions.Item label="Company">
          {project.company || "-"}
        </Descriptions.Item>
        {/* Project Name */}
        <Descriptions.Item label="Name">
          {project.name || "-"}
        </Descriptions.Item>
        {/* Developer Name */}
        <Descriptions.Item label="Developer">
          {project.developer?.name || "-"}
        </Descriptions.Item>
        {/* Developer Registration Number */}
        <Descriptions.Item label="Registration No">
          {project.developer?.registrationNo || "-"}
        </Descriptions.Item>
        {/* Developer Pay Tax */}
        <Descriptions.Item label="Developer Pay Tax">
          <Tag color={project.developerPayTax ? "success" : "error"}>
            {project.developerPayTax ? "Yes" : "No"}
          </Tag>
        </Descriptions.Item>
        {/* State */}
        <Descriptions.Item label="State">
          {project.state?.name || "-"}
        </Descriptions.Item>
        {/* Project Description */}
        <Descriptions.Item label="Description">
          {project.description || "-"}
        </Descriptions.Item>
        {/* Project Status */}
        <Descriptions.Item label="Active">
          <Tag
            icon={
              project.active ? <CheckCircleOutlined /> : <CloseCircleOutlined />
            }
            color={project.active ? "success" : "error"}
          >
            {project.active ? "Active" : "Inactive"}
          </Tag>
        </Descriptions.Item>
        {/* Created By */}
        <Descriptions.Item label="Created By">
          <div className="space-y-1">
            <div>{project.createdBy?.name || "-"}</div>
          </div>
        </Descriptions.Item>
        {/* Created Date */}
        <Descriptions.Item label="Created Date">
          <div className="space-y-1">
            <div className="text-xs text-gray-500">
              {formatDateTime(project.createdAt)}
            </div>
          </div>
        </Descriptions.Item>
        {/* Last Modified By */}
        <Descriptions.Item label="Last Modified By">
          <div className="space-y-1">
            <div>{project.lastModifiedBy?.name || "-"}</div>
          </div>
        </Descriptions.Item>
        {/* Last Modified Date */}
        <Descriptions.Item label="Last Modified Date">
          <div className="space-y-1">
            <div className="text-xs text-gray-500">
              {formatDateTime(project.lastModifiedAt)}
            </div>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProjectInfo;
