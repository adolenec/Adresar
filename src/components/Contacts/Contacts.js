import { useState, useEffect, Fragment } from "react";
import { initializeApp } from "firebase/app";

import { getDatabase, ref, set } from "firebase/database";

import classes from "./Contacts.module.css";
import ContactItem from "./ContactItem";
import ContactsHeader from "./ContactsHeader";
import Pagination from "./Pagination";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

import { contactsActions } from "../store/contacts";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
export const database = getDatabase(app);

const Contacts = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(5);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const rerender = useSelector((state) => state.contacts.rerender);

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
        setFilteredContacts(loadedContacts);
        dispatch(contactsActions.setContacts(loadedContacts));
      })
      .catch(() => {
        setError(true);
      });
  }, [dispatch, rerender]);

  if (error) {
    return <p>Something went wrong!</p>;
  }

  let contactAInfo;
  let contactBInfo;

  const sortAscending = () => {
    const sortedContactsAscending = [...filteredContacts].sort(
      (contactA, contactB) => {
        contactAInfo = (
          contactA.lastName +
          contactA.name +
          contactA.contact
        ).toLowerCase();
        contactBInfo = (
          contactB.lastName +
          contactB.name +
          contactB.contact
        ).toLowerCase();
        return contactAInfo < contactBInfo ? -1 : 1;
      }
    );
    setFilteredContacts(sortedContactsAscending);
  };

  const sortDescending = () => {
    const sortedContactsDescending = [...filteredContacts].sort(
      (contactA, contactB) => {
        contactAInfo = (
          contactA.lastName +
          contactA.name +
          contactA.contact
        ).toLowerCase();
        contactBInfo = (
          contactB.lastName +
          contactB.name +
          contactB.contact
        ).toLowerCase();
        return contactAInfo < contactBInfo ? 1 : -1;
      }
    );
    setFilteredContacts(sortedContactsDescending);
  };

  const filterArray = (value) => {
    if (value) {
      setCurrentPage(1);
      const filteredContacts = contacts.filter((contact) => {
        return (
          (contact.name + contact.lastName)
            .toLowerCase()
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

  const removeContact = (id) => {
    set(ref(database, `contacts/${id}`), null).then(() => {
      dispatch(contactsActions.rerender());
    });
  };

  const displayDeleteModal = (selectedContact) => {
    setSelectedContact(selectedContact);
    setShowDeleteModal(true);
  };

  const displayEditModal = (selectedContact) => {
    setShowEditModal(true);
    setSelectedContact(selectedContact);
    dispatch(contactsActions.setIsEditingContact(true));
  };

  const contactsList = filteredContacts
    .slice(firstContactIndex, lastContactIndex)
    .map((contact) => (
      <ContactItem
        key={contact.id}
        contact={contact}
        onShowDeleteModal={displayDeleteModal}
        onShowEditModal={displayEditModal}
      />
    ));

  return (
    <Fragment>
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
      {showDeleteModal && (
        <DeleteModal
          onShowModal={setShowDeleteModal}
          onRemove={removeContact}
          selectedContact={selectedContact}
        />
      )}
      {showEditModal && (
        <EditModal
          onShowModal={setShowEditModal}
          selectedContact={selectedContact}
        />
      )}
    </Fragment>
  );
};
export default Contacts;
