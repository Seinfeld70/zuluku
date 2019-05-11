import React from "react";
import { connect } from "react-redux";

import UserLogo from "./UserLogo";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Comments from "./Comments";

import Aux from "../../Hoc/MyAux";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";

import classes from "./PostComponent.module.css";
import { deletePost } from "../../actions/index";

class PostComponent extends React.Component {
  state = { commentsShow: false, commentsLength: 0, loading: false };
  onShowComments = () => {
    this.setState(preState => ({
      commentsShow: !preState.commentsShow
    }));
  };
  onDeletePost = async id => {
    await this.setState({ loading: true });
    await this.props.deletePost(id);
    await this.setState({ loading: false });
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
          isPostOwner={this.props.isPostOwner}
          postDelete={() => {
            this.onDeletePost(this.props.postId);
          }}
        />
        <Content title={this.props.title} body={this.props.content} />
        <Footer
          likes={this.props.likes}
          dislikes={this.props.dislikes}
          comments={this.props.comments}
          commentsLength={this.state.commentsLength}
          showComments={this.onShowComments}
          postId={this.props.postId}
        />
        <Comments
          allComments={this.props.comments}
          getCommentLength={size => this.setState({ commentsLength: size })}
          show={this.state.commentsShow}
          postId={this.props.postId}
        />
        {this.state.loading ? (
          <Aux>
            <Modal />
            <Spinner />
          </Aux>
        ) : null}
      </div>
    );
  }
}

export default connect(
  null,
  { deletePost }
)(PostComponent);
