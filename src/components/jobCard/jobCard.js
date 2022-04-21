import "./jobCard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const JobCard = ({
  role,
  user,
  filledJobHandler,
  updateJobHandler,
}) => {
  const [stDate, setStDate] = useState();

  useEffect(() => {
    setStDate(
      new Date(role.startDate).toLocaleString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, [role]);

  return (
    <div className="job-card">
      <h3>{role.jobTitle}</h3>
      <p><strong>Salary:</strong> {role.salary}</p>
      <p><strong>Job Type:</strong> {role.jobType}</p>
      <p><strong>Company Name:</strong> {role.companyName}</p>
      <p><strong>Start Date:</strong> {stDate}</p>
      <p><strong>Location:</strong> {role.location}</p>
      <p><strong>Contact details:</strong> {role.contactDetail}</p>
      <p><strong>Job Description:</strong> {role.description}</p>
      <div className="card-buttons">
        {user === role.userId ? (
          role.publicVisible ? (
            <button
              onClick={() => filledJobHandler(role._id)}
              className="button-alt"
            >
              Mark As Filled
            </button>
          ) : (
            <h3>Job Filled</h3>
          )
        ) : null}
        {user === role.userId ? (
          <Link to="/register">
            <i
              onClick={() => updateJobHandler(role, false)}
              className="fa-solid fa-file-pen"
            ></i>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default JobCard;