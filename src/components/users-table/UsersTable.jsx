import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../redux/actions/usersActions";
import style from './UsersTable.module.css'
import {NavLink} from "react-router-dom";

export default function UsersTable() {
  const dispatch = useDispatch();
  const {usersData, loading, error} = useSelector(store => store.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  return loading ? <div>loading...</div> :
    error ? <div>{error}</div> :
      usersData.length > 0 &&
        (<table className={style.usersTable}>
          <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>username</th>
            <th>email</th>
            <th>address</th>
            <th>zipcode</th>
            <th>phone</th>
            <th>website</th>
            <th>company name</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {usersData.map(user => {
            return <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address.city + ', ' + user.address.street + ', ' + user.address.suite}</td>
              <td>{user.address.zipcode}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.company.name}</td>
              <td><NavLink to={`/userId=${user.id}/posts`}>Posts</NavLink></td>
            </tr>
          })}
          </tbody>
        </table>)
}
