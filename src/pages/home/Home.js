import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
// import { useEffect } from "react";
// import { listMissingPeople } from "../../utils/index.js";
import JobList from "../../components/jobList/jobList.js";
import SearchBar from "../../components/searchBar/SearchBar.js";
import "./Home.css";

const Home = ({ user, updateJobHandler, createJobHandler }) => {
  const [filterOrigin, setFilterOrigin] = useState({});
  const [bool, setBool] = useState(true);

  const filterOriginHandler = () => {
    if (bool) {
      setFilterOrigin({ origin: "myJOB", value: "my" });
    } else {
      setFilterOrigin({ origin: "myJOB", value: "all" });
    }
    setBool(!bool);
  };

  return (
    <>
      {!user && <Navigate to="/" />}
      <section className="home-container">
        <div
          className="title-container"
          style={{
            backgroundColor: "#38b6ff",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "0.375rem",
          }}
        >
          <h1>The #1 Sudan Job Search</h1>
        </div>
        <section className="search-container">
          <div>
            <SearchBar
              filterOrigin={filterOrigin}
              setFilterOrigin={setFilterOrigin}
            />
          </div>
          <div>
            {bool ? (
              <button
                onClick={() => filterOriginHandler()}
                className="button-main"
              >
                My Job Adds
              </button>
            ) : (
              <button
                onClick={() => filterOriginHandler()}
                className="button-main"
              >
                Browse All Available Jobs
              </button>
            )}
            <Link to="/register">
              <button
                onClick={() => createJobHandler(true)}
                className="button-main"
              >
                Advertise Now
              </button>
            </Link>
          </div>
        </section>
        <JobList
          user={user}
          filterOrigin={filterOrigin}
          updateJobHandler={updateJobHandler}
        />
      </section>
    </>
  );
};

export default Home;