export const fetchRequest = async (endpoint, payload, httpVerb) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REST_API}${endpoint}`,
        {
          method: httpVerb,
          headers: { "Content-Type": "application/json" },
          body: payload ? JSON.stringify(payload) : null,
        }
      );
  
      const data = await response.json();
  
      if (data) {
        return data;
      } else {
        throw new Error(`${response.status}, ${response.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const tokenizedFetch = async (endpoint, payload, httpVerb) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REST_API}${endpoint}`,
        {
          method: httpVerb,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("myToken")}`,
          },
          body: payload ? JSON.stringify(payload) : null,
        }
      );
      const data = await response.json();
      if (data) {
        return data;
      } else {
        throw new Error(`${response.status}, ${response.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };