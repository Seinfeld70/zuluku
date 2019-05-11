import React from "react";

import Button from "../UI/Button/Button";
import INPUT from "../UI/Input/Input";
import classes from "./CretePost.module.css";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";
import Aux from "../../Hoc/MyAux";

import { connect } from "react-redux";
import { startNewPost } from "../../actions/index";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

class CreatePost extends React.Component {
  state = {
    elements: {
      textarea: {
        value: "Say something!",
        isRequired: true,
        placeholder: "Say something",
        label: "Body",
        touched: false
      },
      input: {
        value: "",
        isRequired: true,
        placeholder: "title",
        label: "Title",
        touched: false
      }
    },
    errors: false,
    loading: false
  };
  onValueChange(label, value) {
    const updatedState = this.state.elements;

    updatedState[label].value = value;
    updatedState[label].touched = true;
    this.setState({
      elements: { ...updatedState }
    });
  }
  checker = (label, value) => {
    let error = false;
    if (this.state.elements[label].isRequired && value === "") {
      error = true;
    } else error = false;
    return error;
  };
  async onSubmitHandler(e) {
    e.preventDefault();
    await this.setState({ loading: true });
    let error = false;
    error = this.checker("textarea", this.state.elements.textarea.value);
    error = error
      ? true
      : this.checker("input", this.state.elements.input.value);
    if (!error) {
      const newPost = {
        comments: [],
        likes: [],
        dislikes: [],
        title: this.state.elements.input.value,
        content: this.state.elements.textarea.value,
        user: {
          avatar: this.props.currentUser.avatar,
          userId: this.props.currentUser.userId,
          name: this.props.currentUser.name,
          userName: this.props.currentUser.userName
        },
        timeCreated: `${days[new Date().getDay()]} ${
          months[new Date().getMonth()]
        } ${new Date().getFullYear()}`
      };

      await this.props.newPost(newPost);
    }
    this.setState({ loading: false });
  }
  onTextAreaClicked = () => {
    this.setState(preState => {
      return {
        ...preState,
        elements: {
          ...preState.elements,
          textarea: {
            ...preState.elements.textarea,
            value: preState.elements.textarea.touched
              ? preState.elements.textarea.value
              : ""
          }
        }
      };
    });
  };
  render() {
    const inp = this.state.elements.input;
    const txt = this.state.elements.textarea;
    return (
      <div className={classes.CreatePost}>
        <h2>Create a new post.</h2>
        <form onSubmit={this.onSubmitHandler.bind(this)}>
          <INPUT
            type="input"
            value={inp.value}
            placeholder={inp.placeholder}
            onValueChange={this.onValueChange.bind(this)}
            label={inp.label}
            error={() => {
              let res = false;
              if (inp.touched) res = this.checker("input", inp.value);
              return res;
            }}
          />
          <INPUT
            type="textarea"
            placeholder={txt.placeholder}
            label={txt.label}
            value={txt.value}
            onValueChange={this.onValueChange.bind(this)}
            onClicked={this.onTextAreaClicked.bind(this)}
            error={() => {
              let res = false;
              if (txt.touched) res = this.checker("textarea", txt.value);
              return res;
            }}
          />
          <Button type="Success">Post</Button>
        </form>
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
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { newPost: startNewPost }
)(CreatePost);
