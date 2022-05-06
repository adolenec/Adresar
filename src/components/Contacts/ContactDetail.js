import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import SelectedContact from "./SelectedContact";

const ContactDetail = () => {
  const contactsData = useSelector((state) => state.contacts.contactsData);
  const params = useParams();

  const contact = contactsData.find(
    (contact) => contact.id === params.kontaktId
  );

  return (
    <Fragment>
      <SelectedContact
        name={contact.name}
        lastName={contact.lastName}
        contactType={contact.contactType}
        contact={contact.contact}
      />
    </Fragment>
  );
};

export default ContactDetail;
