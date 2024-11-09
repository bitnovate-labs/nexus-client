import { useState } from "react";
import { FormInput, FormSelect, FormSwitch, FormDatePicker } from "../Forms";
import DesignationFormModal from "./Modals/DesignationFormModal";
import AgentFormDrawer from "./AgentFormDrawer";

const GeneralInfoForm = () => {
  const [designationModalOpen, setDesignationModalOpen] = useState(false);
  const [uplineDrawerOpen, setUplineDrawerOpen] = useState(false);

  const branches = ["Kuala Lumpur", "Penang", "Johor Bahru", "Ipoh"];
  const designations = [
    "Negotiator",
    "Pre Leader",
    "Leader",
    "Senior Leader",
    "Vice President",
    "Management",
  ];

  const uplines = [
    { value: "upline1", label: "Upline 1" },
    { value: "upline2", label: "Upline 2" },
  ];

  const sponsors = [
    { value: "sponsor1", label: "Sponsor 1" },
    { value: "sponsor2", label: "Sponsor 2" },
  ];

  return (
    <div className="space-y-4">
      <FormSelect name="branch" label="Branch" required options={branches} />

      <FormSelect
        name="upline"
        label="Upline"
        options={uplines}
        onAdd={() => setUplineDrawerOpen(true)}
      />

      <FormSelect name="sponsor" label="Sponsor" options={sponsors} />

      <FormSelect
        name="designation"
        label="Designation"
        required
        options={designations}
        onAdd={() => setDesignationModalOpen(true)}
      />

      <FormInput
        name="commission"
        label="Commission %"
        type="number"
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

      <FormInput name="incomeTaxNo" label="Income Tax No" />

      <FormSwitch name="withholdingTax" label="Withholding Tax" required />

      <FormSwitch name="leaderboard" label="Leaderboard" required />

      <FormSwitch name="active" label="Active" required />

      <FormInput name="remark" label="Remark" type="textarea" />

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
