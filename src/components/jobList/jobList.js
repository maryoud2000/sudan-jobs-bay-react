import "./jobList.css";
import { useState, useEffect } from "react";
import { fetchRequest } from "../../utils/fetchDry";
import JobCard from "../jobCard/jobCard.js";

const JobList = ({ user, filterOrigin, updateJobHandler }) => {
  const [jobs, setJobs] = useState([]);
  const [listHeader, setListHeader] = useState();

  const getJobs = async () => {
    let payload;
    let endpoint;

    if (filterOrigin && filterOrigin.origin === "searchBar") {
      // Search bar
      setListHeader("Search Results...");
      endpoint = "jobs/search";
      payload = {
        filterKey: "jobTitle",
        filterVal: filterOrigin.value,
      };
    } else if (filterOrigin && filterOrigin.origin === "myJOB") {
      if (filterOrigin.value === "my") {
        // My job adds
        setListHeader("All Available Jobs");
        endpoint = "jobs/filtered";
        payload = {
          filterKey: "userId",
          filterVal: user,
        };
      } else {
        // All public visible adds
        setListHeader("All Available Jobs");
        endpoint = "jobs/filtered";
        payload = {
          filterKey: "publicVisible",
          filterVal: true,
        };
      }
    } else {
      // All public visible adds
      setListHeader("All Available Jobs");
      endpoint = "jobs/filtered";
      payload = {
        filterKey: "publicVisible",
        filterVal: true,
      };
    }

    const data = await fetchRequest(endpoint, payload, "POST");

    setJobs(data.jobs);
  };

  useEffect(() => {
    getJobs();
  }, [filterOrigin, jobs]);

  const filledJobHandler = async (id) => {
    const payload = {
      filterKey: "_id",
      filterVal: id,
      updateKey: "publicVisible",
      updateVal: false,
    };
    const data = await fetchRequest("jobs", payload, "PATCH");
  };

  return (
    <div>
      <h1>{listHeader}</h1>
      <section className="job-list">
        {jobs.map((role, index) => (
          <JobCard
            key={index}
            role={role}
            user={user}
            filledJobHandler={filledJobHandler}
            updateJobHandler={updateJobHandler}
          />
        ))}
      </section>
    </div>
  );
};

export default JobList;