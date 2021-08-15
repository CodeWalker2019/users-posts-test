import style from './PostDetails.module.css';
import {useHistory, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "../posts/post/Post";
import {
  deletePost,
  fetchPost,
  fetchPostComments,
  hideModalDelete,
  showModalDelete,
  toggleEdit,
} from "../../redux/actions/postCommentsActions";
import Comment from "../comment/Comment";
import PostEdit from "./post-edit/PostEdit";
import Modal from "../modal/Modal";
import Loader from "../loader/Loader";
import FadeIn from "react-fade-in";

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
    displayModalDelete
  } = useSelector(store => store.postComments);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchPost(postId));
    dispatch(fetchPostComments(postId));
  }, [])

  function handleDelete() {
    dispatch(deletePost(postId));
    dispatch(showModalDelete());
  }

  function onOk() {
    dispatch(hideModalDelete());
    history.goBack();
  }

  return <FadeIn>
    <div className={style.container}>
      { displayModalDelete && <Modal>
        {deletePostIsPending ? <Loader/> : <>
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
    </div>
  </FadeIn>;
}