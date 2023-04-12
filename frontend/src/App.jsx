import { useState } from "react";
import Login from "./Login";

import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  function handleRegister() {
    const user = {
      userName,
      passWord,
    };

    fetch("http://localhost:5002/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },

      body: JSON.stringify(user),
    }).then((res) => console.log(res));
  }
  return (
    <div className="page">
      <h2>Register</h2>
      <div className="form">
        Username:
        <input
          className="input"
          type="text"
          value={userName}
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        Password:
        <input
          className="input"
          type="text"
          value={passWord}
          placeholder="*****"
          onChange={(e) => setPassWord(e.target.value)}
        />
        <button className="button" onClick={handleRegister}>
          Register
        </button>
      </div>
      <Login />
    </div>
  );
}

export default App;
