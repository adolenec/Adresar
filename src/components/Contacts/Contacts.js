import { useState, useEffect, Fragment } from "react";

import "../layout/common.css";
import ContactItem from "./ContactItem";
import ContactsHeader from "./ContactsHeader";
import Pagination from "./Pagination";

import { contactsActions } from "../../store/contacts";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Contacts = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(5);

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
        const loadedContacts = [];

        for (const key in data) {
          loadedContacts.push({
            id: key,
            contact: data[key].contact.contact,
            contactType: data[key].contact.contactType,
            dateOfBirth: data[key].contact.dateOfBirth,
            name: data[key].contact.name,
            lastName: data[key].contact.lastName,
            isFavourite: data[key].contact.isFavourite,
          });
        }
        setFilteredContacts(loadedContacts);
        dispatch(contactsActions.setContacts(loadedContacts));
        dispatch(contactsActions.showIcons(true));
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

  const contactsList = filteredContacts
    .slice(firstContactIndex, lastContactIndex)
    .map((contact) => <ContactItem key={contact.id} contact={contact} />);

  return (
    <Fragment>
      <div className="contacts-container">
        <ContactsHeader
          onSortAsc={sortAscending}
          onSortDesc={sortDescending}
          onSearch={filterArray}
          onSelectContactsPerPage={setContactsPerPage}
        />
        <div>{contactsList}</div>
        <Pagination numOfPages={numOfPages} onActivePage={activePage} />
      </div>
    </Fragment>
  );
};
export default Contacts;
