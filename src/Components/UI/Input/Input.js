import React from "react";

import classes from "./Input.module.css";

const input = props => {
  let markup;
  switch (props.type) {
    case "textarea":
      markup = (
        <textarea
          className={[
            classes.TextArea,
            props.error() ? classes.Error : null
          ].join(" ")}
          value={props.value}
          onClick={props.onClicked}
          onChange={e => props.onValueChange("textarea", e.target.value)}
        />
      );
      break;
    default:
      markup = (
        <input
          type={props.type || "input"}
          className={[classes.Input, props.error() ? classes.Error : null].join(
            " "
          )}
          placeholder={props.placeholder}
          onChange={e =>
            props.onValueChange(props.type || "input", e.target.value)
          }
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.InputCon}>
      <div className={classes.Label}>{props.label}</div>
      {markup}
      <div style={{ color: "red" }}>{props.error()}</div>
    </div>
  );
};

export default input;
