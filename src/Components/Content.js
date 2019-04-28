import React from "react";
import classes from "../App.module.css";

const content = props => (
  <div className={classes.Content}>
    <div>
      <img src={props.src} alt="post img" />
    </div>
    <p>{props.title}</p>
    <p>{props.bodySummary}</p>
    <div style={{ color: "#aaa" }}>{props.link}</div>
  </div>
);

export default content;
