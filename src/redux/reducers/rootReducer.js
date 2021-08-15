import {combineReducers} from "redux";
import usersReducer from "./usersReducer";
import postsReducer from "./postsReducer";
import postCommentsReducer from "./postCommentsReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  postComments: postCommentsReducer
});

export default rootReducer;