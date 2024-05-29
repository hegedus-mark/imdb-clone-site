import { useState } from "react";

import { FormInput } from "../Input/FormInput";

const defaultFormFields = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    resetFormField();
    console.log("submitted");
  };

  return (
    <div className="sign-up-container">
      <h2>Already Have an Account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          onChange={handleChange}
          name="email"
          required
          value={email}
          type="email"
        />
        <FormInput
          label="Password"
          onChange={handleChange}
          name="password"
          required
          value={password}
          type="password"
        />
        <div className="buttons-container">
          <button type="submit">Sign in</button>
          {/*     <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google Sign in
          </Button> */}
        </div>
      </form>
    </div>
  );
};
