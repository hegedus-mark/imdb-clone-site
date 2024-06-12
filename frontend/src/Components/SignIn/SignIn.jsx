import { useState } from "react";

import { FormInput } from "../FormInput/FormInput";
import { useAuth, useToast } from "../../Hooks";
import "./style.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formError, setFormError] = useState({});
  const { authoriseUser } = useAuth();
  const { showLoadingToast, updateToast } = useToast();
  const { email, password } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    showLoadingToast("Signing in...");
    const response = await authoriseUser("login", formFields);

    if (response.ok) {
      resetFormField();
      updateToast(response.message, "success", {
        autoClose: 5000,
        isLoading: false,
      });
    } else {
      updateToast(response.error.message, "error", {
        autoClose: 5000,
        isLoading: false,
      });
      setFormError(response.error.formError);
    }
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
        <p className="error-message">{formError.message}</p>
        <div className="buttons-container">
          <button  className="fancy-button" type="submit">Sign in</button>
          {/*     <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google Sign in
          </Button> */}
        </div>
      </form>
    </div>
  );
};
