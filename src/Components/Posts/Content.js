import React from "react";
import classes from "./PostComponent.module.css";

const content = props => (
  <div className={classes.Content}>
    <h4>{props.title}</h4>
    <p>{props.body}</p>
  </div>
);

export default content;
