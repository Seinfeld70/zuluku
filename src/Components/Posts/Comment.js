import React from "react";

import classes from "./PostComponent.module.css";
import Button from "../UI/Button/Button";

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
    {props.isOwner ? (
      <Button type="Danger" onClicked={props.onDeleteComment}>
        Delete
      </Button>
    ) : null}
  </div>
);

export default comment;
