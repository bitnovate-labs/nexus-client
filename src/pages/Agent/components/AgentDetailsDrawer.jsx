import { useState, useEffect } from "react";
import { Drawer, Tabs, message, App } from "antd";
import AgentDetailsView from "./AgentDetailsView";
import AgentDetailsEdit from "./AgentDetailsEdit";
import { useAgents } from "../../../hooks/useAgents";

const AgentDetailsDrawer = ({ open, onClose, agent }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [isEditing, setIsEditing] = useState(false);
  const { updateAgent } = useAgents();

  useEffect(() => {
    if (open) {
      setActiveTab("1");
      setIsEditing(false);
    }
  }, [open]);

  const handleSave = async (values) => {
    try {
      await updateAgent(agent.id, {
        ...agent, // Keep existing values as fallback
        ...values, // Override with new values
      });
      <App>{message.success("Agent updated successfully")}</App>;
      setIsEditing(false);
      onClose();
    } catch (error) {
      <App>{message.error(error.message || "Failed to update agent")}</App>;
    }
  };

  const getSectionFromKey = (key) => {
    switch (key) {
      case "1":
        return "personal";
      case "2":
        return "banking";
      case "3":
        return "ren";
      case "4":
        return "general";
      default:
        return "personal";
    }
  };

  const renderContent = () => {
    const section = getSectionFromKey(activeTab);

    if (isEditing) {
      return (
        <AgentDetailsEdit
          agent={agent}
          section={section}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      );
    }

    return (
      <AgentDetailsView
        agent={agent}
        section={section}
        onEdit={() => setIsEditing(true)}
      />
    );
  };

  const items = [
    {
      key: "1",
      label: "Personal Info",
      children: renderContent(),
    },
    {
      key: "2",
      label: "Banking Info",
      children: renderContent(),
    },
    {
      key: "3",
      label: "REN Tag",
      children: renderContent(),
    },
    {
      key: "4",
      label: "General Info",
      children: renderContent(),
    },
  ];

  if (!agent) return null;

  return (
    <Drawer
      title="Agent Details"
      placement="right"
      onClose={onClose}
      open={open}
      width={640}
    >
      <Tabs
        items={items}
        activeKey={activeTab}
        onChange={setActiveTab}
        destroyInactiveTabPane
      />
    </Drawer>
  );
};

export default AgentDetailsDrawer;
