import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Navigation from "./components/layout/Navigation";
import AuthForm from "./components/authentication/AuthForm";
import ContactDetails from "./components/Contacts/ContactDetails";
import Contacts from "./components/Contacts/Contacts";
import NewContact from "./components/Contacts/NewContact";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {isAuthenticated && <Navigation />}
      <Switch>
        {!isAuthenticated && (
          <Route path="/" exact>
            <AuthForm/>
          </Route>
        )}
        {!isAuthenticated && <Redirect to="/" exact />}
        <Route path="/adresar">
          <Contacts/>
        </Route>
        <Route path="/kontakt/detalji/:kontaktId">
          <ContactDetails/>
        </Route>
        <Route path="/kontakt">
          <NewContact/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
