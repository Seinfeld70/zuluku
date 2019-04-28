import React from "react";
import axios from "axios";

import PostComponent from "./Components/PostComponent";

class App extends React.Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    const updatedPosts = [];
    let updatedPost = {};
    const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");

    let preUser = null;

    for (let i = 0; i < posts.data.length; i++) {
      if (preUser !== posts.data[i].userId) {
        var user = await axios.get(
          "https://jsonplaceholder.typicode.com/users/" + posts.data[i].userId
        );
        preUser = posts.data[i].userId;
      }
      updatedPost = {
        userName: user.data.name,
        userId: "@" + user.data.username,
        title: posts.data[i].title,
        body: posts.data[i].body,
        likes: this.random(),
        comments: this.random(),
        shares: this.random(),
        logo: "https://source.unsplash.com/random/80x80",
        postImg: "https://source.unsplash.com/random/600x400"
      };
      updatedPosts.push(updatedPost);
    }
    if (this.state.posts.length === 0) this.setState({ posts: updatedPosts });
  }
  random() {
    return Math.floor(Math.random() * 150 + 3);
  }
  render() {
    let posts = [];
    if (this.state.posts.length > 0) {
      for (let i = 0; i < this.state.posts.length; i++) {
        const p = this.state.posts[i];
        const post = (
          <PostComponent
            title={p.title}
            userName={p.userName}
            userId={p.userId}
            body={p.body}
            likes={p.likes}
            comments={p.comments}
            shares={p.shares}
            key={i}
            postImg={p.postImg}
            logo={p.logo}
          />
        );
        posts.push(post);
      }
    }
    return <div>{posts}</div>;
  }
}

export default App;
