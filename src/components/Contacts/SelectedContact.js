import { useDispatch } from "react-redux";
import { contactsActions } from "../store/contacts";
import classes from "./SelectedContact.module.css";

const SelectedContact = ({ contact }) => {
  const dispatch = useDispatch();

  const showEditModal = () => {
    dispatch(contactsActions.showEditModal(contact));
  };

  const showDeleteModal = () => {
    dispatch(contactsActions.showDeleteModal(contact));
  };

  return (
    <div className={classes.contact}>
      <div className={classes["user-icon"]}>
        <i className="fa-solid fa-user fa-10x"></i>
      </div>
      <div className={classes["main-info"]}>
        <h1>
          {contact.name} {contact.lastName}
        </h1>
        <h3>{contact.contact}</h3>
      </div>
      <div className={classes.actions}>
        <button onClick={showEditModal}>
          <i className="fa-solid fa-pencil fa-2x"></i>
        </button>
        <button onClick={showDeleteModal}>
          <i className="fa-solid fa-trash fa-2x"></i>
        </button>
      </div>
      <div className={classes["contact-info"]}>
        <h3>Contact Type: {contact.contactType}</h3>
        <h3>Date of Birth: {contact.dateOfBirth}</h3>
      </div>
    </div>
  );
};

export default SelectedContact;
