import axios from "axios";

export const FETCH_USERS_REQUEST = 'users/fetch/request';
export const FETCH_USERS_SUCCESS = 'users/fetch/success';
export const FETCH_USERS_ERROR = 'users/fetch/error';

export function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUEST
  }
}

export function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

export function fetchUsersError(errorMessage) {
  return {
    type: FETCH_USERS_ERROR,
    payload: errorMessage
  }
}

export function fetchUsers() {
  return (dispatch) => {
    dispatch( fetchUsersRequest() );
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => dispatch( fetchUsersSuccess( response.data ) ))
      .catch(error => dispatch( fetchUsersError( error.message ) ));
  }
}
