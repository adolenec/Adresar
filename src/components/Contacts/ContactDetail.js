import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SelectedContact from "./SelectedContact";

const ContactDetail = () => {
  const contactsData = useSelector((state) => state.contacts.contacts);
  const params = useParams();

  const contact = contactsData.find(
    (contact) => contact.id === params.kontaktId
  );

  return (
      <SelectedContact
        name={contact.name}
        lastName={contact.lastName}
        contactType={contact.contactType}
        contact={contact.contact}
      />
  );
};

export default ContactDetail;
