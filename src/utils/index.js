// Fetch requests here

//Create user
export const createUser = async (username, email, password, setUser) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REST_API}user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      setUser(data.user);
      //Below - storing data in database in json format, unique id with token
      localStorage.setItem("myToken", data.token);
    } catch (error) {
      console.log(error);
    }
  };
  
  //Login
  export const login = async (username, password, setUser) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REST_API}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("myToken", data.token);
    } catch (error) {
      console.log(error);
    }
  };
  
  //tokenLogin
  export const tokenLogin = async (setUser) => {
    try {
      //fetch request
      const response = await fetch(`${process.env.REACT_APP_REST_API}user`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("myToken")}` },
      });
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  
  //create job add
  export const createJobRole = async (
    userId,
    jobTitle,
    salary,
    jobType,
    companyName,
    startDate,
    location,
    contactDetail,
    description
  ) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REST_API}jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          jobTitle: jobTitle,
          salary: salary,
          jobType: jobType,
          companyName: companyName,
          startDate: startDate,
          location: location,
          contactDetail: contactDetail,
          description: description,
          // publicVisible: publicVisible,
        }),
      });
      const data = await response.json();
  
    } catch (error) {
      console.log(error);
    }
  };
  
  // List all jobs
  export const listJobRoles = async (
    filterKey,
    filterVal,
    setJobRoles
  ) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REST_API}jobs/filtered`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filterKey: filterKey,
            filterVal: filterVal,
          }),
        }
      );
  
      const data = await response.json();
      setJobRoles(data);
    } catch (error) {
      console.log(error);
    }
  };