import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormInput } from "../FormInput/FormInput";
import { useFetchAuth } from "../../Hooks";

const defaultFormFields = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState({});
  const { email, password } = formFields;
  const { authoriseUser, loading } = useFetchAuth("login");

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await authoriseUser(formFields);
    if (response.ok) {
      resetFormField();
      toast.success("Great Success!!!", { containerId: "sign-in" });
    } else {
      setError(response.errors);
      toast.error(`Fail: ${response.message}`, { containerId: "sign-in" });
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        containerId={"sign-in"}
      />
    </div>
  );
};
