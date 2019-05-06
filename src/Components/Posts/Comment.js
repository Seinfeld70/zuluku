import React from "react";

import classes from "./PostComponent.module.css";

const comment = props => (
  <div
    className={classes.Comment}
    style={{ display: props.show ? "flex" : "none" }}
  >
    <div className={classes.Comment_Avatar}>
      <img src={props.commentAvatar} alt="profile pic" />
    </div>
    <div className={classes.Comment_Header}>{props.name}</div>
    <div className={classes.Comment_body}>{props.comment}</div>
  </div>
);

export default comment;
