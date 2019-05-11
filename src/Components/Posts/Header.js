import React from "react";

import classes from "./PostComponent.module.css";
import Button from "../UI/Button/Button";

const header = props => (
  <div className={classes.Header}>
    <div className={classes.Header_Meta}>
      <span className={classes.Header_username}>{props.name} </span>
      <span className={classes.Header_userId}>
        {props.userName} {" - "} {props.time}
      </span>
    </div>
    {props.isPostOwner ? (
      <Button type="Danger" onClicked={props.postDelete}>
        Delete
      </Button>
    ) : null}
  </div>
);

export default header;
