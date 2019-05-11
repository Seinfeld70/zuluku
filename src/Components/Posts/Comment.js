import React from "react";

import classes from "./PostComponent.module.css";
import Button from "../UI/Button/Button";
import MiniSpinner from "../UI/Spinner/MiniSpinner";

class Comment extends React.Component {
  state = { loading: false };
  async onDelete() {
    await this.setState({ loading: true });
    const res = await this.props.onDeleteComment();
    await this.setState({ loading: res });
  }
  render() {
    return (
      <div
        className={classes.Comment}
        style={{ display: this.props.show ? "flex" : "none" }}
      >
        <div className={classes.Comment_Avatar}>
          <img src={this.props.commentAvatar} alt="profile pic" />
        </div>
        <div className={classes.Comment_Header}>{this.props.name}</div>
        <div className={classes.Comment_body}>{this.props.comment}</div>
        {this.props.isOwner ? (
          <Button type="Danger" onClicked={this.onDelete.bind(this)}>
            Delete
          </Button>
        ) : null}
        {this.state.loading ? <MiniSpinner /> : null}
      </div>
    );
  }
}

export default Comment;
