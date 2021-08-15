import {
  DELETE_POST_REQUEST, DELETE_POST_RESPONSE,
  EDIT_POST,
  FETCH_POST_COMMENTS_ERROR,
  FETCH_POST_COMMENTS_REQUEST,
  FETCH_POST_COMMENTS_SUCCESS,
  FETCH_POST_ERROR,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS, HIDE_MODAL,
  NEW_CURRENT_POST_BODY,
  NEW_CURRENT_POST_TITLE,
  PUT_EDITED_POST_REQUEST,
  PUT_EDITED_POST_RESPONSE, SHOW_MODAL,
  TOGGLE_EDIT_POST,
} from "../actions/postCommentsActions";

const initialState = {
  post: null,
  fetchPostLoading: true,
  fetchPostError: '',

  postComments: [],
  fetchCommentsLoading: true,
  fetchCommentsError: false,

  editPost: false,
  currentPostTitle: '',
  currentPostBody: '',

  displayModal: false,
  putEditedPostIsPending: false,
  putEditedPostError: '',
  deletePostIsPending: false,
  deletePostError: ''
}

export default function postCommentsReducer(state = initialState, action) {
  switch (action.type) {

    case DELETE_POST_RESPONSE:
      return {
        ...state,
        deletePostIsPending: false,
        deletePostError: action.payload
      }

    case DELETE_POST_REQUEST:
      return {
        ...state,
        deletePostIsPending: true
      }

    case PUT_EDITED_POST_RESPONSE:
      return {
        ...state,
        putEditedPostError: action.payload,
        putEditedPostIsPending: false,
      }

    case PUT_EDITED_POST_REQUEST:
      return {
        ...state,
        putEditedPostIsPending: true
      }

    case SHOW_MODAL:
      return {
        ...state,
        displayModal: true
      }

    case HIDE_MODAL:
      return {
        ...state,
        displayModal: false
      }

    case NEW_CURRENT_POST_BODY:
      return {
        ...state,
        currentPostBody: action.payload
      }

    case NEW_CURRENT_POST_TITLE:
      return {
        ...state,
        currentPostTitle: action.payload
      }

    case TOGGLE_EDIT_POST:
      return {
        ...state,
        editPost: !state.editPost
      }

    case EDIT_POST:
      return {
        ...state,
        editPost: true
      }

    case FETCH_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        postComments: action.payload,
        fetchCommentsLoading: false
      }

    case FETCH_POST_COMMENTS_ERROR:
      return {
        ...state,
        fetchCommentsError: action.payload,
        fetchCommentsLoading: false
      }

    case FETCH_POST_COMMENTS_REQUEST:
      return {
        ...state,
        fetchCommentsLoading: true
      }

    case FETCH_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        currentPostTitle: action.payload.title,
        currentPostBody: action.payload.body,
        fetchPostLoading: false
      }

    case FETCH_POST_ERROR:
      return {
        ...state,
        fetchPostError: action.payload,
        fetchPostLoading: false
      }

    case FETCH_POST_REQUEST:
      return {
        ...state,
        fetchPostLoading: true
      }

    default:
      return state;
  }
}