import React from "react";

import classes from "./Button.module.css";

const button = props => {
  return (
    <button
      className={[
        props.type === "Success" ? classes.Success : classes.Danger,
        classes.Btn
      ].join(" ")}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
