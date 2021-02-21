import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "16px",
    alignItems: "center",
  },
  searchInput: {
    margin: " 0 16px",
  },
};

const postMatches = (post, searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  const {
    description,
    location,
    title,
    author: { username },
  } = post;
  const toMatch = [description, location, title, username];
  for (const field of toMatch) {
    if (field.toLowerCase().includes(searchTermLower)) {
      return true;
    }
  }
};

const SendMessage = ({ token, post }) => {
  const [messageBody, setMessageBody] = useState("");
  const handleSend = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `/posts/${post._id}/messages`,
      body: { message: { content: messageBody } },
      method: "POST",
      token: token,
    });
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSend}>
        <Textfield
          type="text"
          placeholder="Message content"
          value={messageBody}
          onChange={(event) => {
            setMessageBody(event.target.value);
          }}
        />
        <Button type="submit" onClick={handleSend}>
          Send
        </Button>
      </form>
    </>
  );
};
const Delete = ({ token, post, setPosts }) => {
  const [messageBody, setMessageBody] = useState("");
  const handleDelete = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `/posts/${post._id}`,
      body: { message: { content: messageBody } },
      method: "DELETE",
      token: token,
    });
    console.log("delete data:", data);
  };
  return (
    <>
      <form onSubmit={handleDelete}>
        <Button type="submit" onClick={handleDelete}>
          Delete
        </Button>
      </form>
    </>
  );
};
const Posts= ({ posts, token, userData }) => {
  const history = useHistory();
  const [searchTerm, updateSearchTerm] = useState("");
  const postsToDisplay =
    searchTerm.length > 0
      ? posts.filter((post) => postMatches(post, searchTerm))
      : posts;
  console.log("posts to display:", postsToDisplay);

  return (
    <>
      <div style={styles.searchContainer}>
        <h2>Posts</h2>
        <Textfield
          type="text"
          placeholder="Search posts"
          style={styles.searchInput}
          value={searchTerm}
          onChange={(event) => {
            console.log("searchterm:", event.target.value);
            updateSearchTerm(event.target.value);
          }}
        />
      </div>
      {postsToDisplay.length > 0 ? (
        postsToDisplay.map((post) => (
          <div key={post._id} style={{ border: "1px solid black" }}>
            <h5>{post.title}</h5>
            <div>Posted by : {post.author.username}</div>
            <div>Description : {post.description}</div>
            <div>Created at: {post.createdAt}</div>
            <div>
              {userData._id === post.author._id ? (
                <>
                  <div>Messages: {post.messages}</div>
                  <div>
                    post messages:
                    {post.messages.map((message) => {
                      return (
                        <>
                          <div>From:{message.fromUser.username}</div>
                          <div>Message: {message.content}</div>
                        </>
                      );
                    })}
                  </div>
                </>
              ) : null}

              <SendMessage token={token} post={post} />
            </div>
            <form></form>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                history.push(`/posts/${post._id}`);
              }}
            >
              View Post
            </Button>
            {userData._id === post.author._id ? (
              <Delete token={token} post={post} />
            ) : null}
          </div>
        ))
      ) : (
        <h5> No posts to display</h5>
      )}
    </>
  );
};
export { Posts, SendMessage };
