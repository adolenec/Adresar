import { Route, Switch, Redirect } from "react-router-dom";

import AuthenticationPage from "./pages/AuthenticationPage";
import NewContactPage from "./pages/NewContactPage";
import ContactsPage from "./pages/ContactsPage";
import { useSelector } from "react-redux";

import ContactDetailPage from "./pages/ContactDetailPage";

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

        <Route path="/adresar">
          <ContactsPage />
        </Route>
        <Route path="/kontakt/detalji/:kontaktId">
          <ContactDetailPage />
        </Route>

        <Route path="/kontakt">
          <NewContactPage />
        </Route>
        <Route path="/adresar">
          <ContactsPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
