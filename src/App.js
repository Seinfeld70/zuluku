import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import PostComponents from "./Containers/PostComponents";
import Users from "./Containers/Users";
import Header from "./Components/Header/Header";
import "./App.module.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Route path="/" exact component={PostComponents} />
        <Route path="/users" component={Users} />
      </BrowserRouter>
    );
  }
}

export default App;
