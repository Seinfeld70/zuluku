import React from "react";

import classes from "../App.module.css";

const header = props => (
  <div className={classes.Header}>
    <div className={classes.Header_Meta}>
      <span className={classes.Header_username}>{props.userName} </span>
      <span className={classes.Header_userId}>
        {props.userId} {" . "} {props.time}
      </span>
    </div>
    <div className={classes.Header_title}>{props.title}</div>
    <div className={classes.author}>{props.author}</div>
  </div>
);

export default header;
