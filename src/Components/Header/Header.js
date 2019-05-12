import React from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";

const header = props => {
  return (
    <div className={classes.Header}>
      <h2>Logo</h2>
      <ul className={classes.ListItems}>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/">Posts</Link>
        </li>
      </ul>
    </div>
  );
};

export default header;
