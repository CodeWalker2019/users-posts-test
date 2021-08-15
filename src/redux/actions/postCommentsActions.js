import axios from "axios";

export const FETCH_POST_REQUEST = 'post/fetch/request';
export const FETCH_POST_SUCCESS = 'post/fetch/success';
export const FETCH_POST_ERROR = 'post/fetch/error';
export const FETCH_POST_COMMENTS_REQUEST = 'postComments/fetch/request';
export const FETCH_POST_COMMENTS_SUCCESS = 'postComments/fetch/success';
export const FETCH_POST_COMMENTS_ERROR = 'postComments/fetch/error';
export const EDIT_POST ='post/edit';
export const NEW_CURRENT_POST_TITLE = 'post/newCurrentPostTitle';
export const NEW_CURRENT_POST_BODY = 'post/newCurrentPostBody';
export const TOGGLE_EDIT_POST = 'post/toggleEdit';
export const PUT_EDITED_POST_REQUEST = 'post/put/editedPostRequest';
export const PUT_EDITED_POST_RESPONSE = 'post/put/editedPostResponse';
export const DELETE_POST_REQUEST = 'post/delete/request';
export const DELETE_POST_RESPONSE = 'post/delete/response';
export const SHOW_MODAL = 'post/showModal';
export const HIDE_MODAL = 'post/hideModal';

export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}

export function showModal() {
  return {
    type: SHOW_MODAL
  }
}

export function deletePost(postId) {
  return (dispatch) => {
    dispatch(deletePostRequest());
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => dispatch(deletePostResponse(response.statusText)))
      .catch(err => dispatch(deletePostResponse(err)));
  }
}

export function deletePostRequest() {
  return {
    type: DELETE_POST_REQUEST
  }
}

export function deletePostResponse(msg) {
  return {
    type: DELETE_POST_RESPONSE,
    payload: msg
  }
}

export function putEditedPost(postId, editedTitle, editedBody) {
  return dispatch => {
    dispatch(putEditedPostRequest());
    debugger;
    axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        id: postId,
        title: editedTitle,
        body: editedBody
      })
      .then(response => {
        debugger;
        dispatch(putEditedPostResponse(response.statusText));
      } )
      .catch(err => dispatch(putEditedPostResponse(err)));
  }
}

export function putEditedPostRequest() {
  return {
    type: PUT_EDITED_POST_REQUEST
  }
}

export function putEditedPostResponse(msg) {
  return {
    type: PUT_EDITED_POST_RESPONSE,
    payload: msg
  }
}

export function toggleEdit() {
  return {
    type: TOGGLE_EDIT_POST
  }
}

export function newCurrentPostTitle(newTitle) {
  return {
    type: NEW_CURRENT_POST_TITLE,
    payload: newTitle
  }
}

export function newCurrentPostBody(newBody) {
  return {
    type: NEW_CURRENT_POST_BODY,
    payload: newBody
  }
}

export function editPost() {
  return {
    type: EDIT_POST
  }
}

export function fetchPostComments(postId) {
  return (dispatch) => {
    dispatch(fetchPostCommentsRequest());
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => {
        dispatch(fetchPostCommentsSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchPostCommentsError(error.message))
      });
  }
}

export function fetchPostCommentsSuccess(data) {
  return {
    type: FETCH_POST_COMMENTS_SUCCESS,
    payload: data
  }
}

export function fetchPostCommentsError(errorMsg) {
  return {
    type: FETCH_POST_COMMENTS_ERROR,
    payload: errorMsg
  }
}

export function fetchPostCommentsRequest() {
  return {
    type: FETCH_POST_COMMENTS_REQUEST
  }
}

export function fetchPost(postId) {
  return (dispatch) => {
    dispatch(fetchPostRequest());
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        dispatch(fetchPostSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchPostError(error.message))
      });
  }
}

export function fetchPostError(errorMessage) {
  return {
    type: FETCH_POST_ERROR,
    payload: errorMessage
  }
}

export function fetchPostRequest() {
  return {
    type: FETCH_POST_REQUEST
  }
}

export function fetchPostSuccess(data) {
  return {
    type: FETCH_POST_SUCCESS,
    payload: data
  }
}
