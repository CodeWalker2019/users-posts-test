import style from './NewPostModal.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
  displayNewPostForm,
  postNewPost,
  updateNewPostBody,
  updateNewPostTitle
} from "../../redux/actions/postsAction";
import {useEffect} from "react";

export default function NewPostModal({closeModal, userId}) {
  const {
    newPostBody,
    newPostTitle,
    postIsPending,
    postStatusOk,
    isNewPostFormDisplayed
  } = useSelector(store => store.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayNewPostForm());
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(postNewPost(userId, newPostTitle, newPostBody));
    dispatch(updateNewPostTitle(''));
    dispatch(updateNewPostBody(''));
  }

  function handleTitleChange(event) {
    dispatch(updateNewPostTitle(event.target.value));
  }

  function handleBodyChange(event) {
    dispatch(updateNewPostBody(event.target.value));
  }

  return <div className={style.modalContainer}>
    <div className={style.contentForm}>
      {isNewPostFormDisplayed &&
      <form onSubmit={handleSubmit}>
        <h1>Create a post!</h1>
        <label>Title</label>
        <input type="text" value={newPostTitle} onChange={handleTitleChange}/>
        <label>Body</label>
        <textarea type="text" value={newPostBody} onChange={handleBodyChange}/>
        <button className={style.submitButton}>Submit</button>
        <button className={style.cancelButton} onClick={closeModal}>Cancel</button>
      </form>}

      {!isNewPostFormDisplayed &&
      <div>
        {postIsPending ? <div>Loading...</div>
          : <div className={style.responseMessage}>
            <p>{postStatusOk ? 'New post has been sent!' : 'Something went wrong... :('}</p>
            <button className={style.submitButton} onClick={closeModal}>OK</button>
          </div>
        }
      </div>}
    </div>
  </div>
}