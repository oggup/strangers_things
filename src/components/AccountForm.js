import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callApi } from "../api";

const AccountForm = ({ action, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(action);
  const isLogin = action === "login";
  const title = isLogin ? "Login" : "Register";
  const opposoiteAction = isLogin ? "register" : "login";
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Username is: ${username}`);
    console.log(`Password is: ${password}`);
    const data = await callApi({
      url: `/users/${action}`,
      body: { user: { username, password } },
      method: "POST",
    });
    const token = data?.data?.token;
    if (token) {
      localStorage.setItem("token", token);
      setUsername("");
      setPassword("");
      setToken(token);
      history.push("/");
    }
  };
  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          required
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">{title}</button>
      </form>
      <div>
        {!isLogin ? (
          <div>
            Do you have and account already? Log in
            <Link to={`/${opposoiteAction}`}> here!</Link>
          </div>
        ) : (
          <div>
            Don't have and account yet? Sign up
            <Link to={`/${opposoiteAction}`}> here!</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountForm;
