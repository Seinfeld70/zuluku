import React from "react";

import Comment from "./Comment";
import classes from "./PostComponent.module.css";
import NewComment from "../NewComment/NewComment";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/index";

class Comments extends React.Component {
  state = {
    comments: []
  };
  componentWillMount() {
    this.setState({
      comments: [...this.props.allComments]
    });
  }
  deleteComment = commentId => {
    this.props.deleteComment(
      this.props.postId,
      commentId,
      this.props.currentUserId
    );
    const comments = this.state.comments.filter(c => c.id !== commentId);
    this.setState({ comments });
  };
  render() {
    let comments = [];
    if (this.state.comments.length > 0) {
      comments = this.state.comments.map((comment, i) => (
        <Comment
          commentAvatar={comment.avatar}
          name={comment.name}
          comment={comment.content}
          show={i === 0 ? true : this.props.show}
          isOwner={comment.userId === this.props.currentUserId}
          key={i}
          onDeleteComment={() => {
            this.deleteComment(comment.id);
          }}
        />
      ));
    }

    return (
      <div className={classes.Comments}>
        <NewComment postId={this.props.postId} />
        {comments}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.currentUser.userId
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(Comments);
