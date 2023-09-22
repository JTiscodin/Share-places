import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users.js";
import NewPlace from "./places/pages/NewPlace.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation.js";
import UsersPlaces from "./places/pages/UsersPlaces.js";
import UpdatePlace from "./places/pages/UpdatePlace.js";
function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/:userId/places" exact>
            <UsersPlaces />
          </Route>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/places/:placeId">
            <UpdatePlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}
export default App;
