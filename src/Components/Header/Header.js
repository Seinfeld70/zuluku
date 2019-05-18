import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userLogOut, authUser } from "../../actions/index";
import classes from "./Header.module.css";
import Logo from "../UI/Logo/Logo";

class Header extends React.Component {
  onLogOut() {
    this.props.logOut();
  }
  onAuthUser() {
    this.props.authUser();
  }
  render() {
    return (
      <header className={classes.Header}>
        <Link to="/">
          <Logo />
        </Link>
        <ul className={classes.ListItems}>
          <li>
            {this.props.signIn ? (
              <button
                className={classes.Logout}
                onClick={this.onLogOut.bind(this)}
              >
                Log out
              </button>
            ) : (
              <button
                className={classes.Google}
                onClick={this.onAuthUser.bind(this)}
              >
                Sign In with Google
              </button>
            )}
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/">Posts</Link>
          </li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  signIn: state.currentUser.signIn
});

export default connect(
  mapStateToProps,
  { logOut: userLogOut, authUser }
)(Header);
