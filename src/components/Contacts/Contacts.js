import { useState, useEffect } from "react";

import ContactItem from "./ContactItem";
import classes from "./Contacts.module.css";

const Contacts = (props) => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://adresar-ea8a7-default-rtdb.firebaseio.com/contacts.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Couldn't load data");
        }
        return res.json();
      })
      .then((data) => {
        const responseData = data;

        console.log(data);

        const loadedContacts = [];

        for (const key in responseData) {
          loadedContacts.push({
            id: key,
            contact: responseData[key].contact.contact,
            contactType: responseData[key].contact.contactType,
            dateOfBirth: responseData[key].contact.dateOfBirth,
            name: responseData[key].contact.name,
            lastName: responseData[key].contact.lastName,
          });
        }

        setContacts(loadedContacts);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const contactsList = contacts.map((contact) => (
    <ContactItem
      key={contact.id}
      contact={contact.contact}
      contactType={contact.contactType}
      dateOfBirth={contact.dateOfBirth}
      name={contact.name}
      lastName={contact.lastName}
    />
  ));

  return <div className={classes["contacts-container"]}>{contactsList}</div>;
};

export default Contacts;
