import "../../pages/profile/Profile.css";
import { useState } from "react";
import { tokenizedFetch } from "../../utils/fetchDry.js";

const UpdatePassword = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [currentPasswordShown, setCurrentPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await tokenizedFetch(
      "user",
      { password: newPassword },
      "PATCH"
    );
    if (data.err) {
      setUpdateSuccess(data.err);
    } else {
      setUpdateSuccess(data.msg);
    }
  };

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit}>
        <h3>Update Password</h3>
        <div className="profile-inputs">
          <div className="password">
            <input
              className="input-profile"
              placeholder="new password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="off"
              type={newPasswordShown ? "text" : "password"}
            />
            {newPasswordShown ? (
              <i
                onClick={() => setNewPasswordShown(!newPasswordShown)}
                className="fas fa-eye-slash"
              ></i>
            ) : (
              <i
                onClick={() => setNewPasswordShown(!newPasswordShown)}
                className="fas fa-eye"
              ></i>
            )}
          </div>
          <button className="button-main" type="submit">
            Update Password
          </button>
        </div>
      </form>
      <h3>{updateSuccess}</h3>
    </div>
  );
};

export default UpdatePassword;