import classes from "./ContactItem.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { contactsActions } from "../../store/contacts";
import { database } from "../../config/config";
import { set, ref } from "firebase/database";
import { useState } from "react";

const ContactItem = ({ contact, isEditable = true }) => {
  const dispatch = useDispatch();
  const [isFavourite, setIsFavourite] = useState(contact.isFavourite);

  const showEditModal = () => {
    dispatch(contactsActions.showEditModal(contact));
  };

  const showDeleteModal = () => {
    dispatch(contactsActions.showDeleteModal(contact));
  };

  const setFavouriteContact = () => {
    set(ref(database, `contacts/${contact.id}/contact`), {
      ...contact,
      isFavourite: !isFavourite,
    }).then(() => {
      setIsFavourite((prevState) => !prevState);
    });
  };

  const starClasses = isFavourite ? "favourite" : "not-favourite";

  return (
    <div className={classes["contact-item"]}>
      <div className={classes["user-icon"]}>
        <i className="fa-solid fa-user fa-4x"></i>
      </div>
      <div className={classes["contact-info"]}>
        <h3>
          <Link to={`/kontakt/detalji/${contact.id}`}>
            {contact.name} {contact.lastName}
          </Link>
        </h3>
        <h3>{contact.contact}</h3>
      </div>
      <div className={classes["contact-actions"]}>
        <button onClick={setFavouriteContact} className={classes[starClasses]}>
          <i className="fa-solid fa-star fa-2x"></i>
        </button>
        {isEditable && (
          <button onClick={showEditModal} className={classes["not-favourite"]}>
            <i className="fa-solid fa-pencil fa-2x"></i>
          </button>
        )}
        {isEditable && (
          <button
            onClick={showDeleteModal}
            className={classes["not-favourite"]}
          >
            <i className="fa-solid fa-trash fa-2x"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
