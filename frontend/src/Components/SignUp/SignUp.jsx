import { useState } from "react";

import { FormInput } from "../FormInput/FormInput";
import { useAuth, useToast } from "../../Hooks";
import "./style.scss";

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
  const [formError, setFormError] = useState({});
  const [disabled, setDisabled] = useState(false);
  const { authoriseUser } = useAuth();
  const { showLoadingToast, updateToast } = useToast();

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    setDisabled(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);

    if (password !== confirmPassword) {
      console.log("passwords no matchey matchey");
      setFormError({
        message: "Passwords do not match",
        fields: ["password", "confirmPassword"],
      });
      return;
    }

    showLoadingToast("Signing up...");
    const response = await authoriseUser("register", formFields);
    if (response.ok) {
      resetFormField();
      updateToast("Sign up successful", "success", {
        autoClose: 5000,
        isLoading: false,
      });
    } else {
      updateToast("Sign up failed", "error", {
        autoClose: 5000,
        isLoading: false,
      });

      setFormError(response.error.formError);
    }
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
          errorFields={formError.fields}
        />
        <FormInput
          label="Username"
          onChange={handleChange}
          name="username"
          required
          value={username}
          type="text"
          errorFields={formError.fields}
        />
        <FormInput
          label="Email"
          onChange={handleChange}
          name="email"
          required
          value={email}
          type="email"
          errorFields={formError.fields}
        />
        <FormInput
          label="Password"
          onChange={handleChange}
          name="password"
          required
          value={password}
          type="password"
          errorFields={formError.fields}
        />
        <FormInput
          label="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          required
          value={confirmPassword}
          type="password"
          errorFields={formError.fields}
        />

        <p className="error-message">{formError.message}</p>
        <div className="buttons-container">
          <button className="authButtons" type="submit" disabled={disabled}>
            Sign up
          </button>
          {/*     <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google Sign in
          </Button> */}
        </div>
      </form>
    </div>
  );
};
