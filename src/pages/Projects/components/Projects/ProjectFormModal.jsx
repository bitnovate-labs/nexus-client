import { useEffect, useState } from "react";
import { Form, message } from "antd";
import FormInput from "@components/forms/FormInput";
import FormSelect from "@components/forms/FormSelect";
import FormSwitch from "@components/forms/FormSwitch";
import BaseFormModal from "@components/modals/BaseFormModal";
import { useProjects } from "../../../../hooks/useProjects";
import { useDevelopers } from "../../../../hooks/useDevelopers";
import { useStates } from "../../../../hooks/useStates";
import DeveloperFormModal from "../../../Developers/components/DeveloperFormModal";

const ProjectFormModal = ({ open, onClose, project }) => {
  const [form] = Form.useForm();
  const [developerModalOpen, setDeveloperModalOpen] = useState(false);
  const { createProject, updateProject } = useProjects();
  const { developers, loading: developersLoading } = useDevelopers();
  const { states, loading: statesLoading } = useStates();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (project) {
        await updateProject(project.id, {
          ...values,
          active: values.active ?? true,
          developerPayTax: values.developerPayTax ?? true,
        });
        message.success("Project updated successfully");
      } else {
        await createProject({
          ...values,
          active: values.active ?? true,
          developerPayTax: values.developerPayTax ?? true,
        });
        message.success("Project created successfully");
      }

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Project form validation failed:", error);
      message.error(error.message || "Failed to save project");
    }
  };

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        ...project,
        developerId: project.developer?.id,
        stateId: project.state?.id,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        active: true,
        developerPayTax: true,
      });
    }
  }, [project, form]);

  const developerOptions = developers.map((dev) => ({
    value: dev.id,
    label: dev.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.id,
    label: state.name,
  }));

  return (
    <>
      <BaseFormModal
        title={project ? "Edit Project" : "Add Project"}
        open={open}
        onClose={onClose}
        onSubmit={handleSubmit}
        form={form}
      >
        <FormSelect
          name="company"
          label="Company"
          required
          options={[
            { value: "-", label: "None" },
            { value: "Connexus Realty", label: "Connexus Realty" },
          ]}
          placeholder="Select company"
        />

        <FormInput
          name="name"
          label="Name"
          required
          placeholder="Enter project name"
        />

        <FormSelect
          name="developerId"
          label="Developer"
          required
          options={developerOptions}
          loading={developersLoading}
          onAdd={() => setDeveloperModalOpen(true)}
          placeholder="Select developer"
        />

        <FormSwitch name="developerPayTax" label="Developer Pay Tax" />

        <FormSelect
          name="stateId"
          label="State"
          required
          options={stateOptions}
          loading={statesLoading}
          placeholder="Select state"
        />

        <FormInput
          name="description"
          label="Description"
          type="textarea"
          placeholder="Enter project description"
        />

        <FormSwitch name="active" label="Active" required />
      </BaseFormModal>

      <DeveloperFormModal
        open={developerModalOpen}
        onClose={() => setDeveloperModalOpen(false)}
      />
    </>
  );
};

export default ProjectFormModal;
