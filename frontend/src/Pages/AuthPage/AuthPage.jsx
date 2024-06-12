import { SignIn, SignUp } from "../../Components";
import "./style.scss";

export const AuthPage = () => {
  return (
    <div className="auth-page">
      <div className="authentication-container">
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
};
