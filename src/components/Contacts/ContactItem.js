import classes from "./ContactItem.module.css";
import { Link } from "react-router-dom";
import { contactsActions } from "../store/contacts";
import { useDispatch } from "react-redux";

const ContactItem = (props) => {
  const dispatch = useDispatch();

  const selectedContact = () => {
    const selectedItemData = {
      id: props.id,
      name: props.name,
      lastName: props.lastName,
      contactType: props.contactType,
      contact: props.contact,
    };

    console.log(selectedItemData);

    dispatch(contactsActions.setSelectedContact(selectedItemData));
  };

  const showEditModal = () => {
    props.onShowEditModal(true);
    dispatch(contactsActions.setIsEditingContact(true))
  }

  return (
    <div className={classes["contact-item"]}>
      <div className={classes["user-icon"]}>
        <i className="fa-solid fa-user fa-4x"></i>
      </div>
      <div className={classes["contact-info"]}>
        <h3>
          <Link to={`/kontakt/detalji/${props.id}`}>
            {props.name} {props.lastName}
          </Link>
        </h3>
        <h3>{props.contact}</h3>
      </div>
      <div className={classes["contact-actions"]}>
        <button>
          <i className="fa-solid fa-star fa-2x"></i>
        </button>
        <button onClick={()=>{selectedContact(); showEditModal()}}>
          <i className="fa-solid fa-pencil fa-2x"></i>
        </button>
        <button
          onClick={() => {
            selectedContact();
            props.onShowDeleteModal(true);
          }}
        >
          <i className="fa-solid fa-trash fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
