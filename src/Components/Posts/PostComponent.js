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
  componentWillUnmount() {}
  render() {
    const post = this.props.post;
    const user = post.user;
    return (
      <div className={classes.PostComponent}>
        <UserLogo src={user.photoUrl} alt="profile pic" />
        <Header
          name={user.fullName}
          time={post.timeCreated}
          title={post.title}
          isPostOwner={user.localId === this.props.localId}
          postDelete={() => {
            this.onDeletePost(post.id);
          }}
        />
        <Content title={post.title} body={post.content} />
        <Footer
          likes={post.likes}
          dislikes={post.dislikes}
          comments={post.comments}
          commentsLength={this.state.commentsLength}
          showComments={this.onShowComments}
          postId={post.id}
        />
        <Comments
          allComments={post.comments}
          getCommentLength={size => this.setState({ commentsLength: size })}
          show={this.state.commentsShow}
          postId={post.id}
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

const mapStateToProps = state => {
  return {
    localId: state.currentUser.userData.localId
  };
};

export default connect(
  mapStateToProps,
  { deletePost }
)(PostComponent);
