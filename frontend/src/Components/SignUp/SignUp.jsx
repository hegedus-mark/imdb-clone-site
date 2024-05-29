import { useState } from "react";

import { FormInput } from "../FormInput/FormInput";

const defaultFormFields = {
  displayName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, username, email, password, confirmPassword } =
    formFields;

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
      <h2>Don&apos;t have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          onChange={handleChange}
          name="displayName"
          required
          value={displayName}
          type="text"
        />
        <FormInput
          label="Username"
          onChange={handleChange}
          name="username"
          required
          value={username}
          type="text"
        />
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
        <FormInput
          label="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          required
          value={confirmPassword}
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
