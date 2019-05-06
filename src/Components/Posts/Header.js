import React from "react";

import classes from "./PostComponent.module.css";

const header = props => (
  <div className={classes.Header}>
    <div className={classes.Header_Meta}>
      <span className={classes.Header_username}>{props.name} </span>
      <span className={classes.Header_userId}>
        {props.userName} {" - "} {props.time}
      </span>
    </div>
    <div className={classes.author}>{props.author}</div>
  </div>
);

export default header;
