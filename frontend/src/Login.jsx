import { useState } from "react";

import "./App.css";
let myToken;

function Login() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [money, setMoney] = useState("");

  function handleLogIn() {
    const user = {
      userName,
      passWord,
    };

    fetch("http://localhost:5002/sessions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },

      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        myToken = data.token;
      });
  }

  function handleGetAccount() {
    fetch("http://localhost:5002/me/accounts", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMoney(data.money);
      });
  }
  return (
    <div className="page">
      <h2>Login In</h2>
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
        <button className="button" onClick={handleLogIn}>
          Log In
        </button>
      </div>
      <button className="button" onClick={handleGetAccount}>
        Visa Saldo
      </button>

      <h3>Saldo: {money}</h3>
    </div>
  );
}

export default Login;
