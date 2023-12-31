import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
// import Users from "./user/pages/Users.js";
// import NewPlace from "./places/pages/NewPlace.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation.js";
// import UsersPlaces from "./places/pages/UsersPlaces.js";
// import UpdatePlace from "./places/pages/UpdatePlace.js";
// import Auth from "./user/pages/Auth.js";
import { AuthContext } from "./shared/context/auth-context.js";
import useAuth from "./shared/hooks/auth-hook.js";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner.js";

//Using Lazy loading to increase app speed, and lazy load the components that are not required intitially
const Users = React.lazy(() => {
  return import("./user/pages/Users.js");
});
const NewPlace = React.lazy(() => {
  return import("./places/pages/NewPlace.js");
});
const UsersPlaces = React.lazy(() => {
  return import("./places/pages/UsersPlaces.js");
});
const UpdatePlace = React.lazy(() => {
  return import("./places/pages/UpdatePlace.js");
});
const Auth = React.lazy(() => {
  return import("./user/pages/Auth.js");
});
function App() {
  const { login, logout, userId, token } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Route path="/:userId/places" exact>
          <UsersPlaces />
        </Route>
        <Route path="/" exact>
          <Users />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UsersPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          {" "}
          {/* Using Suspense to make lazy loading work and giving it fallback which is rendered till the lazy files are downloaded */}
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {" "}
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
