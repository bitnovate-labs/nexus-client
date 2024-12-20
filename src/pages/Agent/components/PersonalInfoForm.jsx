import FormInput from "@components/forms/FormInput";

const PersonalInfoForm = () => {
  return (
    <div className="space-y-4">
      <FormInput
        name="name"
        label="Name"
        required
        placeholder="(as in NRIC/Passport)"
      />

      <FormInput name="displayName" label="Display Name" required />

      <FormInput name="nricPassport" label="NRIC/Passport" />

      <FormInput
        name="email"
        label="Email"
        required
        rules={[{ type: "email", message: "Please enter a valid email" }]}
      />

      <FormInput name="mobile" label="Mobile" required />

      <FormInput name="address" label="Address" type="textarea" />
    </div>
  );
};

export default PersonalInfoForm;
