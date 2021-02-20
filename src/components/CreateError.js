import React from "react";
import { Link } from "react-router-dom";

const CreateError = () => {
  return (
    <h1>
      Please <Link to={"/login"}>sign in </Link> or{" "}
      <Link to={"/register"}> sign up</Link> in order to create a new listing
    </h1>
  );
};

export default CreateError;
