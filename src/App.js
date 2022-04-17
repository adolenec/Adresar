import { Route, Switch } from "react-router-dom";
import { Fragment } from "react";

import AuthenticationPage from "./pages/AuthenticationPage";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <AuthenticationPage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
