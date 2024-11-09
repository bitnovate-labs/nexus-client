import { useState } from "react";
import { FormInput, FormSelect } from "../Forms";
import BankFormModal from "./Modals/BankFormModal";

const BankingInfoForm = () => {
  const [bankModalOpen, setBankModalOpen] = useState(false);

  const nricTypes = [
    "NRIC",
    "Company Registration No",
    "Old IC",
    "Police Licence",
    "Passport",
  ];

  const banks = [
    "Maybank",
    "CIMB Bank",
    "Public Bank",
    "Hong Leong Bank",
    "RHB Bank",
  ];

  return (
    <div className="space-y-4">
      <FormInput name="payeeName" label="Payee Name" />

      <FormInput name="payeeNRIC" label="Payee NRIC" />

      <FormSelect
        name="payeeNRICType"
        label="Payee NRIC Type"
        options={nricTypes}
      />

      <FormSelect
        name="bank"
        label="Bank"
        options={banks}
        onAdd={() => setBankModalOpen(true)}
      />

      <FormInput name="bankAccountNo" label="Bank Account No" />

      <FormInput name="swiftCode" label="SWIFT Code" />

      <BankFormModal
        open={bankModalOpen}
        onClose={() => setBankModalOpen(false)}
      />
    </div>
  );
};

export default BankingInfoForm;
