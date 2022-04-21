import "./createJob.css";
import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { fetchRequest } from "../../utils/fetchDry";
import { formatDate } from "../../utils/functions";

const CreateJob = ({ user, jobRole, isCreate }) => {
  const [jobTitle, setJobTitle] = useState();
  const [salary, setSalary] = useState();
  const [jobType, setJobType] = useState();
  const [companyName, setCompanyName] = useState();
  const [startDate, setStartDate] = useState();
  const [location, setLocation] = useState();
  const [contactDetail, setContactDetail] = useState();
  const [description, setDescription] = useState();
  //const [publicVisible, setPublicVisible] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isCreate) {
      // Its an update so populate fields with existing data
      setJobTitle(jobRole.jobTitle);
      setSalary(jobRole.salary);
      setJobType(jobRole.jobType);
      setCompanyName(jobRole.companyName);
      setStartDate(formatDate(jobRole.startDate));
      setLocation(jobRole.location);
      setContactDetail(jobRole.contactDetail);
      setDescription(jobRole.description);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let httpVerb;
    let payload;
    if (isCreate) {
      // Its a create record
      httpVerb = "POST";
      payload = {
        userId: user,
        jobTitle: jobTitle,
        salary: salary,
        jobType: jobType,
        companyName: companyName,
        startDate: startDate,
        location: location,
        contactDetail: contactDetail,
        description: description
      };
    } else {
      //Its an update record
      httpVerb = "PUT";
      payload = {
        id: jobRole._id,
        data: {
          userId: user,
          jobTitle: jobTitle,
          salary: salary,
          jobType: jobType,
          companyName: companyName,
          startDate: startDate,
          location: location,
          contactDetail: contactDetail,
          description: description
        },
      };
    }
    const data = await fetchRequest("jobs", payload, httpVerb);

    setTimeout(() => {
      navigate("/home");
    }, 100);
  };

  return (
    <>
      {!user && <Navigate to="/" />}
      {isCreate ? (
        <h1>Post New Job</h1>
      ) : (
        <h1>Update {jobTitle}'s details</h1>
      )}
      <form onSubmit={handleSubmit} className="job-role-form">
        <input
          type="text"
          name="title"
          placeholder="Job title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <input
          type="text"
          name="type"
          placeholder="Job type"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        />
        <input
          type="text"
          name="CompanyName"
          placeholder="Company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          name="contactDetail"
          placeholder="Contact details"
          value={contactDetail}
          onChange={(e) => setContactDetail(e.target.value)}
        />
        <input id="job-details"
          type="text"
          name="details"
          placeholder="Job details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="button-container">
          <Link to="/home">
            <button className="button-main">Go Back</button>
          </Link>
          <button className="button-main" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateJob;