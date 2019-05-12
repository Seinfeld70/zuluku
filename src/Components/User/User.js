import React from "react";

import classes from "./User.module.css";

const user = props => {
  return (
    <div className={classes.User}>
      <img className={classes.Logo} src={props.info.avatar} alt="Profile Pic" />
      <div className={classes.Info}>
        <h3>{props.info.name}</h3>
        <span className={[classes.Gray, classes.OnlyDesktop].join(" ")}>
          {props.info.age}
        </span>
      </div>
      <div className={classes.Info}>
        <span className={classes.Gray}>{props.info.email}</span>
        <span className={[classes.Gray, classes.OnlyDesktop].join(" ")}>
          {props.info.username}
        </span>
      </div>
    </div>
  );
};

export default user;
