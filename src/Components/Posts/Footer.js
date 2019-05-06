import React from "react";

import classes from "./PostComponent.module.css";
import { connect } from "react-redux";
import {
  addLike,
  removeLike,
  addDislike,
  removeDislike
} from "../../actions/index";

class Footer extends React.Component {
  state = {
    like: false,
    likeNum: null,
    likeId: null,
    dislike: false,
    dislikeNum: null,
    dislikeId: null,
    comment: false,
    commentNum: null
  };
  componentWillMount() {
    let status = { like: null, dislike: null };
    let likeId, dislikeId;

    this.props.likes.forEach(like => {
      if (like[Object.keys(like)[0]] === this.props.userId) {
        status.like = true;
        status.dislike = false;
        likeId = Object.keys(like)[0];
      }
    });

    this.props.dislikes.forEach(dislike => {
      if (dislike[Object.keys(dislike)[0]] === this.props.userId) {
        status.dislike = true;
        status.like = false;
        dislikeId = Object.keys(dislike)[0];
      }
    });

    this.setState({
      commentNum: this.props.comments.length,
      likeNum: this.props.likes.length,
      dislikeNum: this.props.dislikes.length,
      like: status.like,
      dislike: status.dislike,
      likeId,
      dislikeId
    });
  }
  change = lab => {
    const postId = this.props.postId;
    const userId = this.props.userId;
    const likeId = this.state.likeId;
    const dislikeId = this.state.dislikeId;

    const preState = { ...this.state };

    if (this.state.like && lab === "like") {
      this.props.removeLike(postId, likeId);
      preState.like = false;
      preState.likeNum--;
    } else if (!this.state.like && lab === "like") {
      this.props.addLike(postId, userId);
      if (this.state.dislike) {
        this.props.removeDislike(postId, dislikeId);
        preState.dislike = false;
        preState.dislikeNum--;
      }
      preState.like = true;
      preState.likeNum++;
    } else if (!this.state.dislike && lab === "dislike") {
      this.props.addDislike(postId, userId);
      if (this.state.like) {
        this.props.removeLike(postId, likeId);
        preState.like = false;
        preState.likeNum--;
      }
      preState.dislike = true;
      preState.dislikeNum++;
    } else if (this.state.dislike && lab === "dislike") {
      this.props.removeDislike(postId, dislikeId);
      preState.dislike = false;
      preState.dislikeNum--;
    }

    this.setState({ ...preState });

    // this.setState(pre => {
    //   const state = pre[lab];
    //   let updatedNum = pre[lab + "Num"];
    //   if (state) updatedNum--;
    //   else updatedNum++;
    //   return {
    //     [lab]: !state,
    //     [lab + "Num"]: updatedNum
    //   };
    // });
  };
  render() {
    return (
      <div className={classes.Footer}>
        <div>
          <i
            className="fas fa-thumbs-up"
            style={{ color: this.state.like ? "red" : "gray" }}
            onClick={() => this.change("like")}
          />{" "}
          {this.state.likeNum}
        </div>
        <div>
          <i
            className="fas fa-thumbs-down"
            style={{ color: this.state.dislike ? "darkred" : "gray" }}
            onClick={() => this.change("dislike")}
          />{" "}
          {this.state.dislikeNum}
        </div>
        <div>
          <i
            className="fas fa-comment"
            style={{ color: this.state.comment ? "#ccc" : "" }}
            onClick={this.props.showComments}
          />{" "}
          {this.state.commentNum}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.currentUser.userId
});
export default connect(
  mapStateToProps,
  { addDislike, addLike, removeDislike, removeLike }
)(Footer);
