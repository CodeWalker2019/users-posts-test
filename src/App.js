import React, {Suspense} from "react";
import {Provider} from "react-redux";
import store from "./redux/store";
import { Route, Switch} from "react-router-dom";

const Posts = React.lazy(() => import('./components/posts/Posts.jsx').then(component => component));
const UsersTable = React.lazy(() => import('./components/users-table/UsersTable.jsx').then(component => component));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' children={<UsersTable/>}/>
            <Route path='/:userId/posts' children={<Posts/>}/>
          </Switch>
        </Suspense>

      </div>
    </Provider>
  );
}

export default App;
