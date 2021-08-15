import React, {Suspense} from "react";
import {Provider} from "react-redux";
import store from "./redux/store";
import { Route, Switch} from "react-router-dom";
import Loader from "./components/loader/Loader";
import FadeIn from "react-fade-in";

const Posts = React.lazy(() => import('./components/posts/Posts.jsx').then(component => component));
const UsersTable = React.lazy(() => import('./components/users-table/UsersTable.jsx').then(component => component));
const PostDetails = React.lazy(() => import('./components/post-details/PostDetails').then(component => component));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Suspense fallback={<FadeIn><Loader/></FadeIn>}>
          <Switch>
            <Route exact path={['/', '/home']} children={<UsersTable/>}/>
            <Route path='/userId=:userId/posts' children={<Posts/>}/>
            <Route path='/postId=:postId/comments' children={<PostDetails/>}/>
          </Switch>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
