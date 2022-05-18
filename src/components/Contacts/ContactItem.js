import classes from "./ContactItem.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { contactsActions } from "../../store/contacts";

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();

  const showEditModal = () => {
    dispatch(contactsActions.showEditModal(contact));
  };

  const showDeleteModal = () => {
    dispatch(contactsActions.showDeleteModal(contact));
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
