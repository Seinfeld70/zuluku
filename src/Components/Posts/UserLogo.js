import React from "react";

import classes from "./PostComponent.module.css";

const userLogo = props => (
  <div className={classes.UserLogo}>
    <img src={props.src} alt={props.alt} />
  </div>
);

export default userLogo;
