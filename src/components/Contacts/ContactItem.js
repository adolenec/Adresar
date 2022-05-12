import classes from "./ContactItem.module.css";
import { Link } from "react-router-dom";
import { contactsActions } from "../store/contacts";
import { useDispatch } from "react-redux";

const ContactItem = ({ onShowEditModal, onShowDeleteModal, contact }) => {
  const dispatch = useDispatch();

  const selectedContact = () => {
    const selectedItemData = {
      id: contact.id,
      name: contact.name,
      lastName: contact.lastName,
      contactType: contact.contactType,
      contact: contact.contact,
    };

    dispatch(contactsActions.setSelectedContact(selectedItemData));
  };

  const showEditModal = () => {
    selectedContact();
    onShowEditModal(true);
    dispatch(contactsActions.setIsEditingContact(true));
  };

  const showDeleteModal = () => {
    selectedContact();
    onShowDeleteModal(true);
  };
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
        <button>
          <i className="fa-solid fa-star fa-2x"></i>
        </button>

        <button onClick={showEditModal}>
          <i className="fa-solid fa-pencil fa-2x"></i>
        </button>
        <button onClick={showDeleteModal}>
          <i className="fa-solid fa-trash fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
