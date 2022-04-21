import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../media/logo.png";
import { useState } from "react";

const Navbar = ({ user, clearUserHandler }) => {

  return (
    <nav className="container">
      <div className="title">
        <img id="logo" src={logo} alt=""></img>
        <h1 id="jobs-text">Jobs</h1>
        <h1 id="bay-text">Bay</h1>
      </div>
      <ul className="nav_links">
        {user && (
          <li>
            <Link to="/home">
              <p className="listLink">Home</p>
            </Link>
          </li>
        )}
        {user && (
          <li id="pFile">
            <Link to="/profile">
              <p className="listLink">Profile</p>
            </Link>
          </li>
        )}
        {user && (
          <li id="uName">
            <p className="userName">Logged In: {user}</p>
          </li>
        )}
        {user && (
          <button className="button-main" onClick={() => clearUserHandler()}>
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;