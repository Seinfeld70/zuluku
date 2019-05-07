import React from "react";

import UserLogo from "./UserLogo";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Comments from "./Comments";

import classes from "./PostComponent.module.css";

class PostComponent extends React.Component {
  state = { commentsShow: false };
  onShowComments = () => {
    this.setState(preState => ({
      commentsShow: !preState.commentsShow
    }));
  };
  render() {
    return (
      <div className={classes.PostComponent}>
        <UserLogo src={this.props.avatar} alt="profile pic" />
        <Header
          name={this.props.user}
          userName={this.props.userName}
          time={this.props.time}
          title={this.props.title}
          author={process.userName}
        />
        <Content title={this.props.title} body={this.props.content} />
        <Footer
          likes={this.props.likes}
          dislikes={this.props.dislikes}
          comments={this.props.comments}
          showComments={this.onShowComments}
          postId={this.props.postId}
        />
        <Comments
          allComments={this.props.comments}
          show={this.state.commentsShow}
          postId={this.props.postId}
        />
      </div>
    );
  }
}

export default PostComponent;
