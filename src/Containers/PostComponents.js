import React, { Component } from "react";
import { connect } from "react-redux";

import PostComponent from "../Components/Posts/PostComponent";
import Spinner from "../Components/UI/Spinner/Spinner";
import Modal from "../Components/UI/Modal/Modal";
import CreatePost from "../Components/CreatePost/CreatePost";

import { fetchPosts } from "../actions/index";

class PostComponents extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    let posts = [];
    if (this.props.loading) {
      posts.push(<Modal key="1" />);
      posts.push(<Spinner key="2" />);
    } else {
      posts = this.props.posts.map(post => (
        <PostComponent post={post} key={post.id} />
      ));
    }
    return (
      <div>
        {this.props.isSignIn ? <CreatePost /> : null}
        {posts}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.posts.loading,
    error: state.posts.error,
    posts: state.posts.posts,
    currentUser: state.currentUser.userData,
    isSignIn: state.currentUser.signIn
  };
};
export default connect(
  mapStateToProps,
  {
    fetchPosts
  }
)(PostComponents);
