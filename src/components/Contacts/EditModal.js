import ReactDOM from "react-dom";
import classes from "./DeleteModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { contactsActions } from "../store/contacts";
import ContactForm from "./ContactForm";

const EditOverlay = () => {
  const dispatch = useDispatch();
  const selectedContact = useSelector((state) => state.contacts.selectedContact);

  const closeModal = () => {
    dispatch(contactsActions.hideEditModal());
  };

  return (
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2>
            Edit Contact - {selectedContact.name} {selectedContact.lastName}
          </h2>
          <button onClick={closeModal}>
            <i className="fa-solid fa-close fa-2x"></i>
          </button>
        </div>
        <ContactForm selectedContact={selectedContact} />
      </div>
    </div>
  );
};

const EditModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <EditOverlay onShowModal={props.onShowModal} selectedContact={props.selectedContact} />,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default EditModal;
