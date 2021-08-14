import axios from "axios";

export const FETCH_POSTS_REQUEST = 'posts/fetch/request';
export const FETCH_POSTS_SUCCESS = 'posts/fetch/success';
export const FETCH_POSTS_ERROR = 'posts/fetch/error';
export const UPDATE_NEW_POST_TITLE = 'posts/update/newPostTitle';
export const UPDATE_NEW_POST_BODY = 'posts/update/newPostBody';
export const POST_NEW_POST_REQUEST = 'posts/post/newPost';
export const POST_NEW_POST_RESPONSE = 'posts/post/response';
export const DISPLAY_NEW_POST_FORM = 'posts/displayNewPostForm';

export function displayNewPostForm() {
  return {
    type: DISPLAY_NEW_POST_FORM
  }
}

export function postNewPost(userId, title, body) {
  return (dispatch) => {
    dispatch(postNewPostRequest());
    axios.post('https://jsonplaceholder.typicode.com/posts',
      {id: userId, title, body})
      .then(response => {
        const responseOk = response.status >= 200 && response.status < 300;
        dispatch(postNewPostResponse(responseOk))
      })
  }
}

export function postNewPostResponse(isStatusOk) {
  return {
    type: POST_NEW_POST_RESPONSE,
    payload: isStatusOk
  }
}

export function postNewPostRequest() {
  return {
    type: POST_NEW_POST_REQUEST,
  }
}

export function fetchPostsRequest() {
  return {
    type: FETCH_POSTS_REQUEST
  }
}

export function fetchPostsSuccess(users) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: users
  }
}

export function fetchPostsError(errorMessage) {
  return {
    type: FETCH_POSTS_ERROR,
    payload: errorMessage
  }
}

export function fetchPosts(userId) {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => {
        dispatch(fetchPostsSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchPostsError(error.message))
      });
  }
}

export function updateNewPostTitle(newText) {
  return {
    type: UPDATE_NEW_POST_TITLE,
    payload: newText
  }
}

export function updateNewPostBody(newText) {
  return {
    type: UPDATE_NEW_POST_BODY,
    payload: newText
  }
}

