import style from "./NewPostForm.module.css";
import {useEffect} from "react";

export default function NewPostForm({
                                      newPostTitle, newPostBody, closeModal,
                                      postNewPost, updateNewPostTitle, updateNewPostBody
                                    }) {
  useEffect(() => {
    updateNewPostTitle('');
    updateNewPostBody('');
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    postNewPost(newPostTitle, newPostBody);
    updateNewPostTitle('');
    updateNewPostBody('');
  }

  return <form onSubmit={handleSubmit} className={style.contentForm}>
    <h1 className={style.title}>Create a post!</h1>
    <label>Title</label>
    <input type="text" value={newPostTitle} onChange={(e) => updateNewPostTitle(e.target.value)}/>
    <label>Body</label>
    <textarea value={newPostBody} onChange={(e) => updateNewPostBody(e.target.value)}/>
    <button className={style.submitButton}>Submit</button>
    <button className={style.cancelButton} type="button" onClick={closeModal}>Cancel</button>
  </form>
}