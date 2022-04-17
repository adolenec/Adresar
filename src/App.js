import { Route, Switch } from "react-router-dom";
import { Fragment } from "react";

import AuthenticationPage from "./pages/AuthenticationPage";
import NewContactPage from "./pages/NewContactPage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <AuthenticationPage />
        </Route>
        <Layout>
        <Route path="/kontakt">
          <NewContactPage/>
        </Route>
        </Layout>
      </Switch>
    </Fragment>
  );
}

export default App;
