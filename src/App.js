import React from "react";

import PostComponents from "./Containers/PostComponents";
import CreatePost from "./Components/CreatePost/CreatePost";
import "./App.module.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <CreatePost />
        <PostComponents />
      </div>
    );
  }
}

export default App;
