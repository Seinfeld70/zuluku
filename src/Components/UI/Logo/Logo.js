import React from "react";

import image from "../../../Assests/images/logo 512x512.png";
import classes from "./Logo.module.css";

const logo = props => {
  return <img className={classes.Logo} src={image} alt="Logo" />;
};

export default logo;
