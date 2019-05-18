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
    this.props.getCommentLength(this.props.allComments.length);
  }
  deleteComment = async commentId => {
    await this.props.deleteComment(
      this.props.postId,
      commentId,
      this.props.localId
    );
    const comments = this.state.comments.filter(c => c.id !== commentId);
    this.setState({ comments: [...comments] });
    this.props.getCommentLength(comments.length);
    return false;
  };
  onAddComment = (comment, id) => {
    const data = { ...comment, id };
    const preState = [...this.state.comments];
    preState.unshift(data);
    this.setState({ comments: [...preState] });
    this.props.getCommentLength(preState.length);
  };
  render() {
    let comments = [];
    if (this.state.comments.length > 0) {
      comments = this.state.comments.map((comment, i) => (
        <Comment
          commentAvatar={comment.photoUrl}
          name={comment.fullName}
          comment={comment.content}
          show={i === 0 ? true : this.props.show}
          isOwner={comment.localId === this.props.localId}
          key={i}
          onDeleteComment={() => {
            return this.deleteComment(comment.id);
          }}
        />
      ));
    }

    return (
      <div className={classes.Comments}>
        {this.props.isSignIn ? (
          <NewComment
            postId={this.props.postId}
            addComment={this.onAddComment}
          />
        ) : null}
        {comments}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  localId: state.currentUser.userData.localId,
  isSignIn: state.currentUser.signIn
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(Comments);
