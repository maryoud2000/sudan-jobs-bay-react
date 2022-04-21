import "./Login.css";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { fetchRequest, tokenizedFetch } from "../../utils/fetchDry";
import loginBackground from '../../media/login-main-pic.png';

const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [bool, setBool] = useState(true);
  const [actionSuccess, setActionSuccess] = useState();
  const [passwordShown, setPasswordShown] = useState(false);

  const tokenFetch = async () => {
    const data = await tokenizedFetch("user", null, "GET");
    setUser(data.user);
  };

  useEffect(() => {
    if (localStorage.key("myToken")) {
      tokenFetch();
      //tokenLogin(setUser);
    }
  }, [setUser]);

  const submitHandler = async (e) => {
    e.preventDefault();
    let payload;
    let endpoint;
    if (bool && username && password) {
      //Manual Login User

      payload = { username: username, password: password };

      endpoint = "login";
    } else if (username && email && password && email.includes("@")) {
      // Create New User

      payload = { username: username, email: email, password: password };

      endpoint = "user";
    } else {
      setActionSuccess("Required fields are missing");
      return;
    }

    const data = await fetchRequest(endpoint, payload, "POST");

    if (data.err) {
      setActionSuccess(data.err);
    } else {
      setActionSuccess("Success");
      await setUser(data.user);
      localStorage.setItem("myToken", data.token);
    }
  };

  return (
    <div className="split-page">
      <section className="hero-container" 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.3)), url(${loginBackground})`,
                 backgroundSize: "cover",
                 backgroundRepeat: "no-repeat",
                 borderRadius: "0.375rem"}}>
        <h1>JB</h1>
        <p>Start your job search with wide range of live Sudanese vacancies on award-winning CV-Library. Register your CV and find local jobs near you today!</p>
      </section>
      <section className="form-container">
        {user && <Navigate to="/home" />}
        {bool ? <h3>Please Login</h3> : <h3>Please Sign Up</h3>}
        <form className="login-form" onSubmit={submitHandler}>
          <div className="login-inputs">
            <input
              value={username && username.toLowerCase()}
              maxLength="15"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              required
            />
            {!bool && (
              <input
                value={email && email.toLowerCase()}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                required
              />
            )}
            <div className="password">
              <input
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
                autoComplete="off"
                type={passwordShown ? "text" : "password"}
              />
              {passwordShown ? (
                <span><i
                  onClick={() => setPasswordShown(!passwordShown)}
                  className="fas fa-eye-slash"
                ></i></span>
              ) : (
                <span><i
                  onClick={() => setPasswordShown(!passwordShown)}
                  className="fas fa-eye"
                ></i></span>
              )}
            </div>
            {bool ? (
              <button className="button-main" type="submit">
                Login
              </button>
            ) : (
              <button className="button-main" type="submit">
                Sign Up
              </button>
            )}
          </div>
        </form>
        {bool ? (
          <button className="button-alt" onClick={() => setBool(!bool)}>Need to sign up?</button>
        ) : (
          <button  className="button-alt" onClick={() => setBool(!bool)}>Need to log in?</button>
        )}
        <h3 className="action-success">{actionSuccess}</h3>
      </section>
    </div>
   
  );
};

export default Login