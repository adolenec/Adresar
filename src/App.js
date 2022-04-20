import { Route, Switch, Redirect } from "react-router-dom";
import { Fragment } from "react";

import AuthenticationPage from "./pages/AuthenticationPage";
import NewContactPage from "./pages/NewContactPage";
import ContactsPage from "./pages/ContactsPage";
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
            <Route path="/kontakt">
              <NewContactPage />
            </Route>
            <Route path="/adresar">
              <ContactsPage/>
            </Route>
        </Layout>
      </Switch>
    </Fragment>
  );
}

export default App;
