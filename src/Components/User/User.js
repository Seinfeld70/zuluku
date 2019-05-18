import React from "react";

import classes from "./User.module.css";

const user = props => {
  return (
    <div className={classes.User}>
      <img
        className={classes.Logo}
        src={props.info.photoUrl}
        alt="Profile Pic"
      />
      <h3>{props.info.fullName}</h3>
      <div className={classes.Gray}>{props.info.email}</div>
    </div>
  );
};

export default user;
