import style from './PostDetails.module.css';
import {useHistory, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "../posts/post/Post";
import {
  deletePost,
  fetchPost,
  fetchPostComments,
  hideModal,
  showModal,
  toggleEdit,
} from "../../redux/actions/postCommentsActions";
import Comment from "../comment/Comment";
import PostEdit from "./post-edit/PostEdit";
import Modal from "../modal/Modal";

export default function PostDetails() {
  const {postId} = useParams();
  const dispatch = useDispatch();
  const {
    post,
    fetchPostLoading,
    fetchPostError,
    postComments,
    fetchCommentsLoading,
    fetchCommentsError,
    deletePostIsPending,
    deletePostError,
    editPost,
    displayModal
  } = useSelector(store => store.postComments);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchPost(postId));
    dispatch(fetchPostComments(postId));
  }, [])

  function handleDelete() {
    dispatch(deletePost(postId));
    dispatch(showModal());
  }

  function onOk() {
    dispatch(hideModal());
    history.goBack();
  }

  return <div className={style.container}>

    { displayModal && <Modal>
      {deletePostIsPending ? <div>Loading...</div> : <>
        <p className={style.deleteStatus}>{ deletePostError ? deletePostError : 'Successfully deleted!' }</p>
        <button className={style.okButton} onClick={onOk}>Ok</button>
      </>}
    </Modal>}

    <header>
      Details
    </header>
    <hr/>

    {(fetchPostLoading || fetchCommentsLoading) ? <div>Loading...</div> :
      <div>
        {fetchPostError ? <div>{fetchPostError}</div> :
          editPost ? <PostEdit postId={postId}/> :
            <Post post={post} showDetailsButton={false}>
              <button className={style.postButton} onClick={() => dispatch(toggleEdit())}>Edit</button>
              <button className={`${style.postButton} ${style.buttonRed}`} onClick={handleDelete}>Delete</button>
            </Post>}

        {fetchCommentsError ? <div>{fetchCommentsError}</div> :
          postComments.map(comment => <Comment key={comment.id} comment={comment}/>)}
      </div>
    }
  </div>;
}