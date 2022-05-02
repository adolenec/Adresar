import { Route, Switch, Redirect } from "react-router-dom";

import AuthenticationPage from "./pages/AuthenticationPage";
import NewContactPage from "./pages/NewContactPage";
import { useSelector } from "react-redux";
import Navigation from "./components/layout/Navigation";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {isAuthenticated && <Navigation />}
      <Switch>
        {!isAuthenticated && (
          <Route path="/" exact>
            <AuthenticationPage />
          </Route>
        )}
        {!isAuthenticated && <Redirect to="/" exact />}
        <Route path="/kontakt">
          <NewContactPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
