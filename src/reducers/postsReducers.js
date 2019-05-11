import {
  FETCH_POSTS_LOADING,
  FETCH_POSTS_FAIL,
  FETCH_POSTS_SUCCESS,
  NEW_POST_FAIL,
  NEW_POST_SUCCESS,
  NEW_COMMENT_FAIL,
  NEW_COMMENT_SUCCESS,
  ADD_DISLIKE,
  ADD_LIKE,
  REMOVE_DISLIKE,
  REMOVE_LIKE,
  DELETE_COMMENT,
  DELETE_POST
} from "../actions/actionTypes";

const initalState = {
  loading: false,
  posts: [],
  error: null
};

const handleSuccessfulComments = (preState, data, postId) => {
  const pS = { ...preState };
  pS.posts.forEach(post => {
    if (post.id === postId) post.comments.push(data);
  });
  return pS;
};

const handleSuccessfulPosts = (preState, data) => {
  const posts = [...preState.posts];
  posts.unshift(data);
  return { ...preState, posts };
};

const handleSuccessfulPostsLoading = (preState, data) => {
  const posts = [];
  for (let keys in data) {
    const comments = [];
    const likes = [];
    const dislikes = [];
    for (let cms in data[keys].comments) {
      const comment = data[keys].comments[cms];
      comment.id = cms;
      comments.unshift(comment);
    }
    for (let like in data[keys].likes)
      likes.push({ [like]: data[keys].likes[like] });
    for (let dislike in data[keys].dislikes)
      dislikes.push({ [dislike]: data[keys].dislikes[dislike] });

    data[keys].likes = likes;
    data[keys].dislikes = dislikes;
    data[keys].comments = comments;
    data[keys].id = keys;
    posts.unshift(data[keys]);
  }
  return { ...preState, posts };
};

const handleAddLike = (preState, data, label) => {
  const posts = preState.posts.map(post => {
    if (post.id === data.postId) {
      post[label].push({ ...data.data });
    }
    return post;
  });
  return {
    ...preState,
    posts
  };
};

const handleRemoveLike = (preState, data, label) => {
  const posts = preState.posts.map(post => {
    let index = null;
    post[label].forEach((p, i) => {
      // check if data.data[sdkf] === preState.posts[i][label][klsdfj];
      if (Object.keys(p)[0] === data.data) index = i;
    });

    if (post.id === data.postId) {
      if (post[label][index] === data.userId) post[label].splice(index, 1);
    }

    return post;
  });

  return { ...preState, posts };
};

const deleteCommentSuccessful = (preState, data) => {
  const posts = preState.posts.map(post => {
    if (post.id === data.postId) {
      post.comments.forEach((cms, j) => {
        if (cms.id === data.commentId) post.comments.splice(j, 1);
      });
    }
    return post;
  });
  return { ...preState, posts: [...posts] };
};

const handleDeletePost = (preState, postId) => {
  const posts = preState.posts.filter(post => post.id !== postId);
  return { ...preState, posts };
};
export const postsReducers = (preState = initalState, action) => {
  switch (action.type) {
    case FETCH_POSTS_LOADING:
      return { ...preState, loading: action.payload };
    case FETCH_POSTS_FAIL:
    case NEW_POST_FAIL:
    case NEW_COMMENT_FAIL:
      return { ...preState, error: action.payload };
    case NEW_POST_SUCCESS:
      return handleSuccessfulPosts(preState, action.payload);
    case FETCH_POSTS_SUCCESS:
      return handleSuccessfulPostsLoading(preState, action.payload);
    case NEW_COMMENT_SUCCESS:
      return handleSuccessfulComments(
        preState,
        action.payload.data,
        action.payload.postId
      );
    case DELETE_COMMENT:
      return deleteCommentSuccessful(preState, action.payload);
    case ADD_DISLIKE:
      return handleAddLike(preState, action.payload, "dislikes");
    case ADD_LIKE:
      return handleAddLike(preState, action.payload, "likes");
    case REMOVE_DISLIKE:
      return handleRemoveLike(preState, action.payload, "dislikes");
    case REMOVE_LIKE:
      return handleRemoveLike(preState, action.payload, "likes");
    case DELETE_POST:
      return handleDeletePost(preState, action.payload);
    default:
      return preState;
  }
};
