import React from "react";

import Button from "../UI/Button/Button";
import { connect } from "react-redux";
import classes from "../Posts/./PostComponent.module.css";
import itClasses from "./NewComment.module.css";
import { newComment } from "../../actions/index";
import MiniSpinner from "../UI/Spinner/MiniSpinner";

class NewComment extends React.Component {
  state = {
    textarea: {
      value: "Your Comment...",
      error: true,
      touched: false
    },
    loading: false
  };
  componentWillMount() {
    this.setState({
      postId: this.props.postId
    });
  }
  changeValueHandler = async e => {
    const pre = { ...this.state.textarea };
    await this.setState({
      textarea: { ...pre, value: e.target.value, touched: true }
    });

    if (this.state.textarea.value) {
      await this.setState(preValue => ({
        textarea: {
          ...preValue.textarea,
          error: preValue.textarea.value ? false : true
        }
      }));
    }
  };

  submitHandler = async e => {
    e.preventDefault();
    await this.setState({ loading: true });
    if (this.state.textarea.value) {
      // Will dispatch the new Comment Creator action
      const data = {
        photoUrl: this.props.user.photoUrl,
        content: this.state.textarea.value,
        fullName: this.props.user.fullName,
        localId: this.props.user.localId
      };
      const postId = this.state.postId;
      const cmId = await this.props.newComment(data, postId);
      this.props.addComment(data, cmId);
    } else
      this.setState(preState => ({ textarea: { ...preState, error: true } }));
    await this.setState({ loading: false });
  };
  render() {
    let border = "1px solid #999";

    if (this.state.textarea.error && this.state.textarea.touched)
      border = "1px solid red";
    else border = "1px solid #999";

    return (
      <div className={classes.Comment}>
        <div className={classes.Comment_Avatar}>
          <img src={this.props.user.photoUrl} alt="profile pic" />
        </div>
        <div className={classes.Comment_Header}>{this.props.user.FullName}</div>
        <form onSubmit={this.submitHandler} className={itClasses.Form}>
          <textarea
            onChange={this.changeValueHandler}
            style={{ border }}
            className={itClasses.TextArea}
            value={this.state.textarea.value}
            onClick={() =>
              this.setState(preVal => ({
                textarea: {
                  ...preVal.textarea,
                  value: preVal.textarea.touched ? preVal.textarea.value : "",
                  error: preVal.textarea.touched ? true : preVal.textarea.error
                }
              }))
            }
          />
          <Button type="Success" disabled={this.state.textarea.error}>
            Submit
          </Button>
        </form>
        {this.state.loading ? <MiniSpinner /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.currentUser.userData
});

export default connect(
  mapStateToProps,
  { newComment }
)(NewComment);
