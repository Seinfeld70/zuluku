import React from "react";

import classes from "../App.module.css";

class Footer extends React.Component {
  state = {
    like: false,
    share: false,
    comment: false,
    likeNum: null,
    shareNum: null,
    commentNum: null
  };
  componentWillMount() {
    this.setState({
      commentNum: this.props.comments,
      shareNum: this.props.shares,
      likeNum: this.props.likes
    });
  }
  change = lab => {
    this.setState(pre => {
      const state = pre[lab];
      let updatedNum = pre[lab + "Num"];
      if (state) updatedNum--;
      else updatedNum++;
      return {
        [lab]: !state,
        [lab + "Num"]: updatedNum
      };
    });
  };

  render() {
    return (
      <div className={classes.Footer}>
        <div>
          <i
            className="fas fa-comment"
            style={{ color: this.state.comment ? "#ccc" : "" }}
          />{" "}
          {this.state.commentNum}
        </div>
        <div>
          <i
            className="fas fa-retweet"
            style={{ color: this.state.share ? "green" : "" }}
            onClick={() => this.change("share")}
          />{" "}
          {this.state.shareNum}
        </div>
        <div>
          <i
            className="fas fa-heart"
            style={{ color: this.state.like ? "red" : "gray" }}
            onClick={() => this.change("like")}
          />{" "}
          {this.state.likeNum}
        </div>
        <div>
          {" "}
          <i className="fas fa-envelope size 7x" />
        </div>
      </div>
    );
  }
}

export default Footer;
