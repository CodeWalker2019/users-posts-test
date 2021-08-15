import {postNewPost, updateNewPostBody, updateNewPostTitle} from "../../redux/actions/postsActions";
import {connect} from "react-redux";
import NewPostForm from "./NewPostForm";

const mapStateToProps = (store) => {
  return {
    newPostTitle: store.posts.newPostTitle,
    newPostBody: store.posts.newPostBody,
  }
}

const mapDispatchToProps = (dispatch, {userId, closeModal}) => {
  return {
    closeModal,
    postNewPost: (newPostTitle, newPostBody) => dispatch(postNewPost(userId, newPostTitle, newPostBody)),
    updateNewPostTitle: (text) => dispatch(updateNewPostTitle(text)),
    updateNewPostBody: (text) => dispatch(updateNewPostBody(text)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm);