import React, { useState, useEffect } from "react";
import {
  AccountForm,
  Update,
  Posts,
  Post,
  Navbar,
  Dashboard,
  Create,
  CreateError,
} from ".";
import { Route } from "react-router-dom";
import { callApi } from "../api";

const fetchUserData = async (token) => {
  const { data } = await callApi({
    url: "/users/me",
    token,
  });
  return data;
};
const fetchPosts = async () => {
  const {
    data: { posts },
  } = await callApi({
    url: "/posts",
  });
  return posts;
};

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyposts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(async () => {
    if (!token) {
      setToken(localStorage.getItem("token"));
      setIsLoggedIn(false);
      return;
    }
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }
    const posts = await fetchPosts();
    setPosts(posts);
    console.log("Posts:", posts);
  }, [token]);
  console.log(`Token is: ${token}`);

  console.log("userData", userData);

  return (
    <>
      <h1>Stranger's Things</h1>
      <Navbar
        userData={userData}
        setUserData={setUserData}
        setToken={setToken}
      />
      {userData.username && <div> Welcome, {userData.username}!</div>}
      <Route exact path="/posts">
        <Posts posts={posts} token={token} userData={userData} />
      </Route>
      <Route path="/posts/:postId">
        <Post posts={posts} token={token} userData={userData} />
      </Route>
      <Route path="/dashboard">
        <Dashboard posts={posts} token={token} userData={userData} />
      </Route>
      <Route path="/login">
        <AccountForm
          action="login"
          setToken={setToken}
          setUserData={setUserData}
        />
      </Route>
      <Route path="/register">
        <AccountForm
          action="register"
          setToken={setToken}
          setUserData={setUserData}
        />
      </Route>
      <Route path="/create">
        <Create token={token} userData={userData} />
      </Route>
      <Route path="/update/:postId">
        <Update token={token} userData={userData} />
      </Route>
      <Route path="/create-error">
        <CreateError />
      </Route>
    </>
  );
};

export default App;
