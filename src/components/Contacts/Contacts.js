import { useState, useEffect } from "react";

import ContactItem from "./ContactItem";
import classes from "./Contacts.module.css";
import ContactsHeader from "./ContactsHeader";
import Pagination from "./Pagination";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(5);

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
        setFilteredContacts(loadedContacts);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error) {
    return <p>Something went wrong!</p>;
  }

  const sortAscending = () => {
    const sortedContactsAscending = [...filteredContacts].sort(
      (contactA, contactB) => {
        return contactA.lastName.toLowerCase() +
          contactA.name.toLowerCase() +
          contactA.contact.toLowerCase() >
          contactB.lastName.toLowerCase() +
            contactB.name.toLowerCase() +
            contactB.contact.toLowerCase()
          ? 1
          : -1;
      }
    );
    setFilteredContacts(sortedContactsAscending);
  };

  const sortDescending = () => {
    const sortedContactsDescending = [...filteredContacts].sort(
      (contactA, contactB) => {
        return contactA.lastName.toLowerCase() +
          contactA.name.toLowerCase() +
          contactA.contact.toLowerCase() <
          contactB.lastName.toLowerCase() +
            contactB.name.toLowerCase() +
            contactB.contact.toLowerCase()
          ? 1
          : -1;
      }
    );
    setFilteredContacts(sortedContactsDescending);
  };

  const filterArray = (value) => {
    if (value) {
      setCurrentPage(1);
      const filteredContacts = contacts.filter((contact) => {
        return (
          (contact.name.toLowerCase() + contact.lastName.toLowerCase())
            .replace(/\s+/g, "")
            .includes(value.toLowerCase().replace(/\s+/g, "")) ||
          contact.contact.toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredContacts(filteredContacts);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const lastContactIndex = currentPage * contactsPerPage;
  const firstContactIndex = lastContactIndex - contactsPerPage;

  const numOfPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const activePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const contactsList = filteredContacts
    .slice(firstContactIndex, lastContactIndex)
    .map((contact) => (
      <ContactItem
        key={contact.id}
        contact={contact.contact}
        name={contact.name}
        lastName={contact.lastName}
      />
    ));

  return (
    <div className={classes["contacts-container"]}>
      <ContactsHeader
        onSortAsc={sortAscending}
        onSortDesc={sortDescending}
        onSearch={filterArray}
        onSelectContactsPerPage={setContactsPerPage}
      />
      <div>{contactsList}</div>
      <Pagination numOfPages={numOfPages} onActivePage={activePage} />
    </div>
  );
};

export default Contacts;
