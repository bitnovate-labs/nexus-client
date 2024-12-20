import { useState } from "react";
import { useQuery } from "@apollo/client";
import FormInput from "@components/forms/FormInput";
import FormSelect from "@components/forms/FormSelect";
import FormSwitch from "@components/forms/FormSwitch";
import FormDatePicker from "@components/forms/FormDatePicker";
import DesignationFormModal from "../../Designation/components/DesignationFormModal";
import AgentFormDrawer from "./AgentFormDrawer";
import { useBranches } from "../../../hooks/useBranches";
import { useDesignations } from "../../../hooks/useDesignations";
import { GET_AGENTS } from "../../../graphql/queries/agents";

const GeneralInfoForm = () => {
  const [designationModalOpen, setDesignationModalOpen] = useState(false);
  const [uplineDrawerOpen, setUplineDrawerOpen] = useState(false);
  const { branches, loading: branchesLoading } = useBranches();
  const { designations, loading: designationsLoading } = useDesignations();
  const { data: agentsData, loading: agentsLoading } = useQuery(GET_AGENTS);

  const designationOptions = designations
    .filter((designation) => designation.active)
    .sort((a, b) => a.rank - b.rank)
    .map((designation) => ({
      value: designation.name,
      label: designation.name,
    }));

  const branchOptions = branches
    .filter((branch) => branch.active)
    .map((branch) => ({
      value: branch.name,
      label: branch.name,
    }));

  // Include all agents in leader and recruiter options, not just active ones
  const agentOptions = (agentsData?.agents || [])
    .map((agent) => ({
      value: agent.displayName,
      label: `${agent.displayName}${!agent.active ? " (Inactive)" : ""}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // CODE BLOCK FOR FUTURE USE - need to confirm if dropdown list only requires active agents
  // const recruiterOptions = (agentsData?.agents || [])
  //   .filter((agent) => agent.active)
  //   .map((agent) => ({
  //     value: agent.displayName,
  //     label: agent.displayName,
  //   }));

  return (
    <div className="space-y-4">
      <FormSelect
        name="branch"
        label="Branch"
        required
        options={branchOptions}
        loading={branchesLoading}
      />

      <FormSelect
        name="leader"
        label="Leader"
        options={agentOptions}
        loading={agentsLoading}
        showSearch
        optionFilterProp="label"
        placeholder="Select leader"
        onAdd={() => setUplineDrawerOpen(true)}
      />

      <FormSelect
        name="recruiter"
        label="Recruiter"
        options={agentOptions}
        loading={agentsLoading}
        showSearch
        optionFilterProp="label"
        placeholder="Select recruiter"
      />

      <FormSelect
        name="designation"
        label="Designation"
        required
        options={designationOptions}
        loading={designationsLoading}
        onAdd={() => setDesignationModalOpen(true)}
      />

      <FormInput
        name="commissionPercentage"
        label="Commission %"
        type="number"
        min={0}
        max={100}
        placeholder="Enter commission percentage"
        rules={[
          {
            type: "number",
            min: 0,
            max: 100,
            message: "Commission must be between 0 and 100",
          },
        ]}
      />

      <FormDatePicker name="joinDate" label="Join Date" required />

      <FormDatePicker name="resignDate" label="Resign Date" />

      <FormInput
        name="incomeTaxNo"
        label="Income Tax No"
        placeholder="Enter income tax number"
      />

      <FormSwitch name="withholdingTax" label="Withholding Tax" required />

      <FormSwitch name="leaderboard" label="Leaderboard" required />

      <FormSwitch name="active" label="Active" required />

      <FormInput
        name="remark"
        label="Remark"
        type="textarea"
        placeholder="Enter any additional remarks"
      />

      <DesignationFormModal
        open={designationModalOpen}
        onClose={() => setDesignationModalOpen(false)}
      />

      {uplineDrawerOpen && (
        <AgentFormDrawer
          open={uplineDrawerOpen}
          onClose={() => setUplineDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default GeneralInfoForm;
