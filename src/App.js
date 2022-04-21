import "./index.css";
import { useState } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home.js";
import CreateJob from "./pages/createJob/createJob.js";
import Footer from "./components/footer/Footer";
import Profile from "./pages/profile/Profile";

const App = () => {
  const [user, setUser] = useState();
  const [isCreate, setIsCreate] = useState(true);
  const [jobRole, setJobRole] = useState();

  const clearUserHandler = () => {
    setUser(null);
    localStorage.removeItem("myToken");
  };

  const updateJobHandler = (role, isCreate) => {
    if (!isCreate) {
      setIsCreate(false);
      setJobRole(role);
    }
  };

  const createJobHandler = () => {
    setIsCreate(true);
    setJobRole(null);
  };

  return (
    <div className="app-container">
      <header>
        <Navbar user={user} clearUserHandler={clearUserHandler} />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Login user={user} setUser={setUser} />} />
          <Route
            path="/home"
            element={
              <Home
                setUser={setUser}
                user={user}
                updateJobHandler={updateJobHandler}
                createJobHandler={createJobHandler}
              />
            }
          />
          <Route
            path="/register"
            element={
              <CreateJob
                user={user}
                isCreate={isCreate}
                setJobRole={setJobRole}
                jobRole={jobRole}
                updateJobHandler={updateJobHandler}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                setUser={setUser}
                clearUserHandler={clearUserHandler}
              />
            }
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;