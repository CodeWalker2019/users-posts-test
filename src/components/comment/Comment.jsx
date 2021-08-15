import style from './Comment.module.css';

export default function Comment({comment}) {

  return <div className={style.commentContainer}>
    <h1>{comment.email}</h1>
    <h2>{comment.name}</h2>
    <p>{comment.body}</p>
  </div>
}