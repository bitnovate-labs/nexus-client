import InputForm from "@components/forms/InputForm";

const PersonalInfoForm = () => {
  return (
    <div className="space-y-4">
      <InputForm
        name="name"
        label="Name"
        required
        placeholder="(as in NRIC/Passport)"
      />

      <InputForm name="displayName" label="Display Name" required />

      <InputForm name="nricPassport" label="NRIC/Passport" />

      <InputForm
        name="email"
        label="Email"
        required
        rules={[{ type: "email", message: "Please enter a valid email" }]}
      />

      <InputForm name="mobile" label="Mobile" required />

      <InputForm name="address" label="Address" type="textarea" />
    </div>
  );
};

export default PersonalInfoForm;
