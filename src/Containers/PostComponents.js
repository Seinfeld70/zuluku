import React, { Component } from "react";
import { connect } from "react-redux";

import PostComponent from "../Components/Posts/PostComponent";
import Spinner from "../Components/UI/Spinner/Spinner";
import Modal from "../Components/UI/Modal/Modal";

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
      posts = this.props.posts.map(p => (
        <PostComponent
          title={p.title}
          content={p.content}
          userName={p.user.userName}
          user={p.user.name}
          avatar={p.user.avatar}
          likes={p.likes}
          dislikes={p.dislikes}
          comments={p.comments}
          time={p.timeCreated}
          key={p.id}
          postId={p.id}
        />
      ));
    }
    return <div>{posts}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.posts.loading,
    error: state.posts.error,
    posts: state.posts.posts
  };
};
export default connect(
  mapStateToProps,
  {
    fetchPosts
  }
)(PostComponents);
