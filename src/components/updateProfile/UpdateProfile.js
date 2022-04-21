import "../../pages/profile/Profile.css";
import { useState } from "react";
import { fetchRequest } from "../../utils/fetchDry.js";

const UpdateProfile = ({ user }) => {
  const [email, setEmail] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      filterKey: "username",
      filterVal: user,
      updateKey: "email",
      updateVal: email,
    };

    const data = await fetchRequest("user", payload, "PUT");
    if (data.err) {
      setUpdateSuccess(data.err);
    } else {
      setUpdateSuccess("Profile updated successfully");
    }
  };

  return (
    <div className="profile-form">
      <h3>Update Email</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="profile-inputs">
          <input
            className="input-profile"
            placeholder="update email"
            type="email"
            name="email"
            value={email && email.toLowerCase()}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="button-main" type="submit">
            Update Email
          </button>
        </div>
      </form>
      <h3>{updateSuccess}</h3>
    </div>
  );
};

export default UpdateProfile;