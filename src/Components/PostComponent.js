import React from "react";

import UserLogo from "./UserLogo";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

import classes from "../App.module.css";

const postComponent = props => {
  return (
    <div className={classes.PostComponent}>
      <UserLogo src={props.logo} alt="profile pic" />
      <Header
        userId={props.userId}
        userName={props.userName}
        time="Sep 10"
        title={props.title}
        author={process.userName}
      />
      <Content
        title={props.title}
        link="Dev.to"
        body={props.body}
        src={props.postImg}
      />
      <Footer
        likes={props.likes}
        shares={props.shares}
        comments={props.comments}
      />
    </div>
  );
};

export default postComponent;
