import { useState, useEffect } from "react";

import ContactItem from "./ContactItem";
import classes from "./Contacts.module.css";
import ContactsHeader from "./ContactsHeader";

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

  console.log(contacts);

  const sortedContactsAscending = [...contacts].sort((contactA, contactB) => {
    return contactA.lastName.toLowerCase() > contactB.lastName.toLowerCase()
      ? 1
      : -1;
  });

  const sortedContactsDescending = [...contacts].sort((contactA, contactB) => {
    return contactA.lastName.toLowerCase() < contactB.lastName.toLowerCase()
      ? 1
      : -1;
  });

  const sortAscending = () =>{
    setContacts(sortedContactsAscending);
  }

  const sortDescending = () => {
      setContacts(sortedContactsDescending);
  }


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

  return (
    <div className={classes["contacts-container"]}>
      <ContactsHeader onSortAsc={sortAscending} onSortDesc={sortDescending} />
      <div>{contactsList}</div>
    </div>
  );
};

export default Contacts;
