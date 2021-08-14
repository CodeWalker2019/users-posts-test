import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../../redux/actions/postsAction";
import style from "./Posts.module.css";
import NewPostModal from "../new-post-modal/NewPostModal";

export default function Posts() {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    data,
    fetchLoading,
    fetchError,
  } = useSelector(store => store.posts);

  useEffect(() => {
    dispatch(fetchPosts(userId));
  }, []);

  return <>
    {showModal && <NewPostModal userId={userId} closeModal={() => setShowModal(false)}/>}

    <div
      className={`${style.postsContainer} ${showModal ? style.overflowHidden : ''}`}
    >
      <header>
        <h1>Recent Posts</h1>
        <button onClick={() => setShowModal(true)}>New Post</button>
      </header>
      <hr/>

      {fetchLoading ? <div>Loading...</div> :
        fetchError ? <div>{fetchError}</div> :
          data && data.map(post => {
            return <div className={style.post} key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <NavLink to='/'>Details</NavLink>
            </div>
          })}
    </div>
  </>
}