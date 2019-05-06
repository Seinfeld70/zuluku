import React from "react";

import Comment from "./Comment";
import classes from "./PostComponent.module.css";
import NewComment from "../NewComment/NewComment";

const comments = props => {
  let comments = [];
  if (props.allComments.length > 0) {
    comments = props.allComments.map((comment, i) => (
      <Comment
        key={comment.id}
        commentAvatar={comment.avatar}
        name={comment.name}
        comment={comment.content}
        show={i === props.allComments.length - 1 ? true : props.show}
      />
    ));
  }

  return (
    <div className={classes.Comments}>
      <NewComment postId={props.postId} />
      {comments}
    </div>
  );
};

export default comments;
