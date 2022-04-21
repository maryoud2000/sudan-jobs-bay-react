import { fetchRequest } from "../../utils/fetchDry";
import { useState } from "react";

import nopic from "../../media/nopic-male.jpg";

export const Test = () => {
  const [testMsg, setTestMsg] = useState("none");

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = await fetchRequest(`test`, null, "GET");

    if (data.test) {
      setTestMsg(data.test.testString);
    }
  };

  return (
    <div>
      <h1>{testMsg}</h1>
      <form onSubmit={submitHandler}>
        <input type="submit" value="Get Message" className="submit-btn" />
      </form>
      <h3>Media Image</h3>
      <img src={nopic} width="250" height="250" alt="no avatar - male" />
      <h3>Web Image</h3>
      <img
        src={"https://randomuser.me/api/portraits/women/66.jpg"}
        width="250"
        height="250"
        alt="no avatar - male"
      />
    </div>
  );
};