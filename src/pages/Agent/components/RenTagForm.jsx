import InputForm from "@components/forms/InputForm";
import DatePickerForm from "@components/forms/DatePickerForm";

const RenTagForm = () => {
  return (
    <div className="space-y-4">
      <InputForm name="renNo" label="REN No" placeholder="Enter REN number" />

      <InputForm
        name="renLicense"
        label="REN License"
        placeholder="Enter REN license"
      />

      <DatePickerForm
        name="renExpiredDate"
        label="REN Expired Date"
        allowClear
      />
    </div>
  );
};

export default RenTagForm;
