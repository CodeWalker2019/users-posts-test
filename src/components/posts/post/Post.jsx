import "../../../index.css";
import {NavLink} from "react-router-dom";

export default function Post({post, showDetailsButton=true, children}) {
  return <div className='postContainer'>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
    {showDetailsButton && <NavLink to={`/postId=${post.id}/comments`}>Details</NavLink>}
    {children}
  </div>
}