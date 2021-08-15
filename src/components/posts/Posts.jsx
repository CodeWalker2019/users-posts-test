import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {displayNewPostForm, fetchPosts} from "../../redux/actions/postsActions";
import style from "./Posts.module.css";
import Modal from "../modal/Modal";
import NewPostFormContainer from "../new-post-form/NewPostFormContainer";
import Post from "./post/Post";
import Loader from "../loader/Loader";
import FadeIn from "react-fade-in";

export default function Posts() {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    data,
    fetchLoading,
    fetchError,
    isNewPostFormDisplayed,
    postIsPending,
    postStatusOk
  } = useSelector(store => store.posts);

  useEffect(() => {
    dispatch(fetchPosts(userId));
  }, []);

  function handleCloseModal() {
    setShowModal(false);
    dispatch(displayNewPostForm());
  }

  return <FadeIn>
    {showModal &&
    <Modal>
      {isNewPostFormDisplayed && <NewPostFormContainer userId={userId} closeModal={() => setShowModal(false)}/>}
      {!isNewPostFormDisplayed && (postIsPending ?
        <Loader/> :
        <div className={style.responseMessage}>
          <p>{postStatusOk ? 'New post has been published!' : 'Something went wrong... :('}</p>
          <button className={style.submitButton} onClick={handleCloseModal}>OK</button>
        </div>)}
    </Modal>}

    <div className={`
    ${style.postsContainer} 
    ${showModal ? style.overflowHidden : ''}
    `}>
      <header>
        <h1>Recent Posts</h1>
        <button onClick={() => setShowModal(true)}>
          New Post
        </button>
      </header>
      <hr/>
      {fetchLoading ? <Loader/> :
        fetchError ? <div>{fetchError}</div> :
          data && data.map(post => <Post key={post.id} post={post}/>)}
    </div>
  </FadeIn>
}
