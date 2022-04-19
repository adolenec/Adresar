import { Route, Switch, Redirect } from "react-router-dom";
import { Fragment } from "react";

import AuthenticationPage from "./pages/AuthenticationPage";
import NewContactPage from "./pages/NewContactPage";
import Layout from "./components/layout/Layout";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Fragment>
      <Switch>
        {!isAuthenticated && (
          <Route path="/" exact>
            <AuthenticationPage />
          </Route>
        )}
        {!isAuthenticated && <Redirect to="/" exact />}
        <Layout>
          {isAuthenticated && (
            <Route path="/kontakt">
              <NewContactPage />
            </Route>
          )}
        </Layout>
      </Switch>
    </Fragment>
  );
}

export default App;
