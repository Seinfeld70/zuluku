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
      onClick={props.onClicked}
    >
      {props.children}
    </button>
  );
};

export default button;
