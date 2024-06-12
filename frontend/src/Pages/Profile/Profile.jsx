import { useParams } from "react-router-dom";
import { useState } from "react";

import { changePassword } from "../../Services";
import { useFetchData, useAuth } from "../../Hooks";
import { ChangePasswordForm, Loading } from "../../Components";

import "./style.scss";

const confirmPassword = (newPassword, confirmNewPassword) => {
  return newPassword === confirmNewPassword;
};

export const Profile = () => {
  const { userId } = useParams();
  const { token, logout } = useAuth();
  const { data, loading, error } = useFetchData(
    true,
    `/api/user/${userId}/profile`,
    "GET",
    null,
    token
  );
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handlePasswordSubmit = async (
    newPassword,
    confirmNewPassword,
    currentPassword
  ) => {
    if (!confirmPassword(newPassword, confirmNewPassword)) {
      alert("Passwords do not match");
      return;
    }
    const response = await changePassword(
      newPassword,
      currentPassword,
      userId,
      token
    );

    if (response.ok) {
      alert("Password changed successfully");
      setShowChangePassword(false);
    } else {
      alert(response.statusText);
    }
    console.log(response);
  };

  let user;
  if (data) {
    user = data.user;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="profile-page">
      {user && (
        <div className="profile-container">
          <div className="user-profile">
            <h1>Profile</h1>
            <p>
              <span className="highlight">Username:</span> {user.username}
            </p>
            <p>
              <span className="highlight">Email:</span> {user.email}
            </p>
            <p>
              <span className="highlight">Display Name:</span>{" "}
              {user.displayName}
            </p>
          </div>
          <div className="change-password">
            <div>
              {!showChangePassword ? (
                <button
                  className="fancy-button"
                  onClick={() => setShowChangePassword(true)}
                >
                  Change Password
                </button>
              ) : (
                <ChangePasswordForm
                  setShowChangePassword={setShowChangePassword}
                  changePassword={handlePasswordSubmit}
                />
              )}
            </div>
          </div>
          <button className="fancy-button logout" onClick={() => logout()}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
