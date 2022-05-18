import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Navigation from "./components/layout/Navigation";
import AuthForm from "./components/authentication/AuthForm";
import ContactDetails from "./components/contacts/ContactDetails";
import Contacts from "./components/contacts/Contacts";
import NewContact from "./components/contacts/NewContact";
import EditModal from "./components/contacts/EditModal";
import DeleteModal from "./components/contacts/DeleteModal";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const isDeleteModalOpen = useSelector((state) => state.contacts.isDeleteModalOpen);
  const isEditModalOpen = useSelector((state) => state.contacts.isEditModalOpen);

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
      {isEditModalOpen && <EditModal/>}
      {isDeleteModalOpen && <DeleteModal/>}
    </>
  );
}

export default App;
