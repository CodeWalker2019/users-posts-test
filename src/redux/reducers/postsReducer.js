import {
  DISPLAY_NEW_POST_FORM,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS, POST_NEW_POST_REQUEST, POST_NEW_POST_RESPONSE, UPDATE_NEW_POST_BODY,
  UPDATE_NEW_POST_TITLE
} from "../actions/postsAction";

const initialState = {
  data: [],
  fetchLoading: false,
  fetchError: '',
  postIsPending: false,
  postStatusOk: null,
  newPostTitle: '',
  newPostBody: '',
  isNewPostFormDisplayed: true,
}

export default function postsReducer(state = initialState, action) {
  switch (action.type) {

    case DISPLAY_NEW_POST_FORM:
      return {
        ...state,
        isNewPostFormDisplayed: true
      }

    case POST_NEW_POST_RESPONSE:
      return {
        ...state,
        postStatusOk: action.payload,
        postIsPending: false
      }

    case POST_NEW_POST_REQUEST:
      return {
        ...state,
        isNewPostFormDisplayed: false,
        postIsPending: true
      }

    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        fetchLoading: true
      }

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        data: action.payload
      }

    case FETCH_POSTS_ERROR:
      return {
        ...state,
        fetchError: action.payload,
        fetchLoading: false
      }

    case UPDATE_NEW_POST_TITLE:
      return {
        ...state,
        newPostTitle: action.payload
      }

    case UPDATE_NEW_POST_BODY:
      return {
        ...state,
        newPostBody: action.payload
      }

    default:
      return state;
  }
}