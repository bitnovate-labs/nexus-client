import { FormInput, FormDatePicker } from "../../../components/forms";

const RenTagForm = () => {
  return (
    <div className="space-y-4">
      <FormInput name="renNo" label="REN No" placeholder="Enter REN number" />

      <FormInput
        name="renLicense"
        label="REN License"
        placeholder="Enter REN license"
      />

      <FormDatePicker
        name="renExpiredDate"
        label="REN Expired Date"
        allowClear
      />
    </div>
  );
};

export default RenTagForm;
