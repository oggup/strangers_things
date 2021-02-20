import React, { useState } from "react";
import {useHistory, Redirect} from 'react-router-dom'
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Create = ({ token, userData }) => {
  // const history = useHistory();
  // const redirectSubmit = history.push("/create-error");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `/posts`,
      body: { post: { title, description, price, location, willDeliver } },
      method: "POST",
      token: token,
    });
    console.log("willDeliver:", willDeliver);
  };


  
return (
    <>

      <div>
        <form onSubmit={handleSubmit} >
          <div>
            <Textfield
              type="text"
              placeholder="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div>
            <Textfield
              type="text"
              placeholder="price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <Textfield
            type="text"
            placeholder="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <div>
            <Textfield
              type="text"
              placeholder="location"
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
                onChange={(event) => setWillDeliver(event.currentTarget.checked)}
                />
              }
              label="Willing to deliver?"
              labelPlacement="start"
            />
          </div>
          <Button type="submit" variant="outlined" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};
// if (!userData._id){return <Redirect to={"/create-error"}/>}else
// {  }

export default Create;
