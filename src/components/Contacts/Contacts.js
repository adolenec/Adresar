import { useState, useEffect, Fragment } from "react";
import { initializeApp } from "firebase/app";

import { getDatabase, ref, set } from "firebase/database";

import ContactItem from "./ContactItem";
import classes from "./Contacts.module.css";
import ContactsHeader from "./ContactsHeader";
import Pagination from "./Pagination";
import { contactsActions } from "../store/contacts";
import { useDispatch } from "react-redux";

import DeleteModal from "./DeleteModal";

const firebaseConfig = {
  apiKey: "AIzaSyAuPyU-vTstxsbdjpRKaEc9tGcU2WiwEFQ",
  authDomain: "adresar-ea8a7.firebaseapp.com",
  databaseURL: "https://adresar-ea8a7-default-rtdb.firebaseio.com",
  projectId: "adresar-ea8a7",
  storageBucket: "adresar-ea8a7.appspot.com",
  messagingSenderId: "421594675906",
  appId: "1:421594675906:web:74d8125c31811481b6195b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(5);
  const [rerender, setRerender] = useState(false);

  const dispatch = useDispatch();

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
        dispatch(contactsActions.setContacts(loadedContacts));
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [dispatch, rerender]);

  if (error) {
    return <p>Something went wrong!</p>;
  }

  const sortAscending = () => {
    const sortedContactsAscending = [...filteredContacts].sort(
      (contactA, contactB) => {
        return contactA.lastName.toLowerCase() > contactB.lastName.toLowerCase()
          ? 1
          : -1;
      }
    );
    setFilteredContacts(sortedContactsAscending);
  };

  const sortDescending = () => {
    const sortedContactsDescending = [...filteredContacts].sort(
      (contactA, contactB) => {
        return contactA.lastName.toLowerCase() < contactB.lastName.toLowerCase()
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
        return (contact.name.toLowerCase() + contact.lastName.toLowerCase())
          .replace(/\s+/g, "")
          .includes(value.toLowerCase().replace(/\s+/g, ""));
      });
      setFilteredContacts(filteredContacts);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const LastContactIndex = currentPage * contactsPerPage;
  const FirstContactIndex = LastContactIndex - contactsPerPage;
  const activeContacts = filteredContacts.slice(
    FirstContactIndex,
    LastContactIndex
  );

  const activePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const removeContact = (id) => {
    set(ref(database, `contacts/${id}`), null).then(() => {
      setRerender(!rerender);
    });
  };

  const contactsList = activeContacts.map((contact) => (
    <ContactItem
      key={contact.id}
      id={contact.id}
      contact={contact.contact}
      name={contact.name}
      lastName={contact.lastName}
      onRemove={removeContact}
    />
  ));

  return (
    <Fragment>
      <div className={classes["contacts-container"]}>
        <ContactsHeader
          onSortAsc={sortAscending}
          onSortDesc={sortDescending}
          onInput={filterArray}
          onSelect={setContactsPerPage}
        />
        <div>{contactsList}</div>
        <Pagination
          contactsPerPage={contactsPerPage}
          totalContacts={filteredContacts.length}
          onActivePage={activePage}
        />
      </div>
      <DeleteModal />
    </Fragment>
  );
};
export default Contacts;
