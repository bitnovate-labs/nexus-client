import { useState } from "react";
import InputForm from "@components/forms/InputForm";
import SelectForm from "@components/forms/SelectForm";
import BankFormModal from "../../Banks/components/BankFormModal";
import { useBanks } from "@hooks/useBanks";

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
      <InputForm
        name="payeeName"
        label="Payee Name"
        placeholder="Enter payee name"
      />

      <InputForm
        name="payeeNric"
        label="Payee NRIC/Passport"
        placeholder="Enter NRIC/Passport number"
      />

      <SelectForm
        name="payeeNricType"
        label="NRIC Type"
        options={nricTypeOptions}
        placeholder="Select NRIC type"
      />

      <SelectForm
        name="bank"
        label="Bank"
        options={bankOptions}
        loading={banksLoading}
        onAdd={() => setBankModalOpen(true)}
        placeholder="Select bank"
        allowClear
      />

      <InputForm
        name="bankAccountNo"
        label="Bank Account No"
        placeholder="Enter bank account number"
      />

      <InputForm
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
