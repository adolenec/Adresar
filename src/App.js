import { Route, Switch } from "react-router-dom";
import { Fragment } from "react";

import AuthenticationPage from "./pages/AuthenticationPage";
import NewContactPage from "./pages/NewContactPage";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <AuthenticationPage />
        </Route>
        <Route path="/kontakt">
          <NewContactPage/>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
