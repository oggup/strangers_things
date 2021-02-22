import React, { useState } from "react";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Update = ({ token, post }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const handleUpdate = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `/posts/${post._id}`,
      body: { post: { title, description, price, location, willDeliver } },
      method: "PATCH",
      token: token,
    });
  };

  return (
    <>
      <div>
        <form onSubmit={handleUpdate}>
          <div>
            <Textfield
              type="text"
              placeholder={post.title}
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div>
            <Textfield
              type="text"
              placeholder={post.price}
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <Textfield
            type="text"
            placeholder={post.description}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <div>
            <Textfield
              type={"text"}
              placeholder={post.location}
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) =>
                    setWillDeliver(event.currentTarget.checked)
                  }
                />
              }
              label="Willing to deliver?"
              labelPlacement="start"
            />
          </div>
          <Button type="submit" variant="outlined" color="primary">
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

export default Update;
