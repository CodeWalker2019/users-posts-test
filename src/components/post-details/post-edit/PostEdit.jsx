import {useDispatch, useSelector} from 'react-redux';
import '../../../index.css';
import style from './PostEdit.module.css';
import {
  hideModal,
  newCurrentPostBody,
  newCurrentPostTitle, putEditedPost,
  toggleEdit,
  showModal
} from "../../../redux/actions/postCommentsActions";
import Modal from "../../modal/Modal";
import {useEffect} from "react";

export default function PostEdit({postId}) {
  const {
    currentPostTitle,
    currentPostBody,
    post,
    displayModal,
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
    dispatch(showModal());
    dispatch(putEditedPost(postId, currentPostTitle, currentPostBody));
  }

  function handleOkClick() {
    dispatch(hideModal());
    dispatch(toggleEdit());
  }

  return <>
    {displayModal && <Modal>
      {putEditedPostIsPending ? <div>Loading...</div> : <>
        <p className={style.responseStatus}>
          {putEditedPostError ? putEditedPostError : 'Success!'}
        </p>
        <button
          className={style.okButton}
          onClick={handleOkClick}
        >
          Ok
        </button>
      </>}
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