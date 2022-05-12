import { useParams } from "react-router-dom";
import SelectedContact from "./SelectedContact";
import { useEffect, useState } from "react";

const ContactDetail = () => {
  const params = useParams();
  const [contact, setContact] = useState({});

  useEffect(() => {
    fetch(
      `https://adresar-ea8a7-default-rtdb.firebaseio.com/contacts/${params.kontaktId}/contact.json`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setContact(data);
      });
  }, [params.kontaktId]);

  return (
    <SelectedContact
      name={contact.name}
      lastName={contact.lastName}
      dateOfBirth={contact.dateOfBirth}
      contactType={contact.contactType}
      contact={contact.contact}
    />
  );
};

export default ContactDetail;
