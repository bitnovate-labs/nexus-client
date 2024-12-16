import { useState } from "react";
import { FormInput, FormSelect } from "../../../components/forms";
import BankFormModal from "../../Banks/components/BankFormModal";
import { useBanks } from "../../../hooks/useBanks";

const BankingInfoForm = () => {
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const { banks, loading: banksLoading } = useBanks();

  const bankOptions = banks
    .filter((bank) => bank.active)
    .map((bank) => ({
      value: bank.name,
      label: bank.name,
    }));

  const nricTypeOptions = [
    { value: "-", label: "None" },
    { value: "NRIC", label: "NRIC" },
    { value: "Company Registration No", label: "Company Registration No" },
    { value: "Old IC", label: "Old IC" },
    { value: "Police Licence", label: "Police Licence" },
    { value: "Passport", label: "Passport" },
  ];

  return (
    <div className="space-y-4">
      <FormInput
        name="payeeName"
        label="Payee Name"
        placeholder="Enter payee name"
      />

      <FormInput
        name="payeeNric"
        label="Payee NRIC/Passport"
        placeholder="Enter NRIC/Passport number"
      />

      <FormSelect
        name="payeeNricType"
        label="NRIC Type"
        options={nricTypeOptions}
        placeholder="Select NRIC type"
      />

      <FormSelect
        name="bank"
        label="Bank"
        options={bankOptions}
        loading={banksLoading}
        onAdd={() => setBankModalOpen(true)}
        placeholder="Select bank"
        allowClear
      />

      <FormInput
        name="bankAccountNo"
        label="Bank Account No"
        placeholder="Enter bank account number"
      />

      <FormInput
        name="swiftCode"
        label="Swift Code"
        placeholder="Enter SWIFT code"
      />

      <BankFormModal
        open={bankModalOpen}
        onClose={() => setBankModalOpen(false)}
      />
    </div>
  );
};

export default BankingInfoForm;
