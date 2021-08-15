import {useDispatch, useSelector} from 'react-redux';
import '../../../index.css';
import style from './PostEdit.module.css';
import {
  hideModalEdit,
  newCurrentPostBody,
  newCurrentPostTitle, putEditedPost,
  toggleEdit,
  showModalEdit
} from "../../../redux/actions/postCommentsActions";
import Modal from "../../modal/Modal";
import Loader from "../../loader/Loader";
import FadeIn from "react-fade-in";

export default function PostEdit({postId}) {
  const {
    currentPostTitle,
    currentPostBody,
    post,
    displayModalEdit,
    putEditedPostIsPending,
    putEditedPostError
  } = useSelector(store => store.postComments);
  const dispatch = useDispatch();

  function cancelEdit() {
    dispatch(newCurrentPostTitle(post.title));
    dispatch(newCurrentPostBody(post.body));
    dispatch(toggleEdit());
  }

  function handleSubmit() {
    dispatch(showModalEdit());
    dispatch(putEditedPost(postId, currentPostTitle, currentPostBody));
  }

  function handleOkClick() {
    dispatch(hideModalEdit());
    dispatch(toggleEdit());
  }

  return <>
    {displayModalEdit && <Modal>
      {putEditedPostIsPending ? <Loader/> : <FadeIn>
        <p className={style.responseStatus}>
          {putEditedPostError ? putEditedPostError : 'Success!'}
        </p>
        <button
          className={style.okButton}
          onClick={handleOkClick}
        >
          Ok
        </button>
      </FadeIn>}
    </Modal>}

    <div className='postContainer'>
      <input
        type="text"
        className={style.editPostTitle}
        value={currentPostTitle}
        onChange={(e) => dispatch(newCurrentPostTitle(e.target.value))}/>
      <textarea
        className={style.editPostBody}
        value={currentPostBody}
        onChange={(e) => dispatch(newCurrentPostBody(e.target.value))}/>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={cancelEdit}>Cancel</button>
    </div>
  </>;
}