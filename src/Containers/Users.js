import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions/index";

import User from "../Components/User/User";
import Modal from "../Components/UI/Modal/Modal";
import Spinner from "../Components/UI/Spinner/Spinner";
import MyAux from "../Hoc/MyAux";
import classes from "../App.module.css";

class Users extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    let result;
    if (this.props.users.loading) {
      result = (
        <MyAux>
          <Modal />
          <Spinner />
        </MyAux>
      );
    } else if (this.props.users.users.length > 0) {
      result = this.props.users.users.map(user => (
        <User info={user} key={user.userId} />
      ));
    } else if (this.props.users.error) {
      result = <p style={{ color: "#ee9230" }}>Something went Wrong</p>;
    }
    return <div className={classes.Users}>{result}</div>;
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { fetchUsers }
)(Users);
