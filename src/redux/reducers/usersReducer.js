import {FETCH_USERS_ERROR, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS} from "../actions/usersActions";

const initialState = {
  usersData: [],
  loading: false,
  error: ''
}

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        usersData: action.payload
      }

    case FETCH_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state;
  }
}
