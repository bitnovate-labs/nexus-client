import { useParams, useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import ProjectInfo from "./components/ProjectDetails/ProjectInfo";
import UnitType from "./components/ProjectDetails/UnitType";
import Attachment from "./components/ProjectDetails/Attachment";
import ProjectSchedule from "./components/ProjectDetails/ProjectSchedule";
import CommissionScheme from "./components/ProjectDetails/CommissionScheme";
import AgentCommission from "./components/ProjectDetails/AgentCommission";
import ProjectManagerCommission from "./components/ProjectDetails/ProjectManagerCommission";
import ProjectPackage from "./components/ProjectDetails/ProjectPackage";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../graphql/queries/projects";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const handleBack = () => {
    navigate("/projects");
  };

  const handleEdit = () => {
    // Handle edit action
  };

  const handleMoreAction = () => {
    // Handle more actions
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const project = data?.project;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          Back
        </Button>
        <Space>
          <Button icon={<EditOutlined />} onClick={handleEdit}>
            Edit
          </Button>
          <Button icon={<MoreOutlined />} onClick={handleMoreAction}>
            More Action
          </Button>
        </Space>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Project Info */}
        <div className="lg:col-span-4">
          <ProjectInfo project={project} />
        </div>

        {/* Right Column - Other Sections */}
        <div className="lg:col-span-8 space-y-6">
          <UnitType projectId={id} />
          <Attachment projectId={id} />
          <ProjectSchedule projectId={id} />
          <CommissionScheme projectId={id} />
          <AgentCommission projectId={id} />
          <ProjectManagerCommission projectId={id} />
          <ProjectPackage projectId={id} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
