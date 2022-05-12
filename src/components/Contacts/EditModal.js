import ReactDOM from "react-dom";
import classes from "./DeleteModal.module.css";
import { useDispatch } from "react-redux";
import { contactsActions } from "../store/contacts";
import ContactsForm from "./ContactsForm";

const EditOverlay = ({ onShowModal, selectedContact }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    onShowModal(false);
    dispatch(contactsActions.setIsEditingContact(false));
  };

  const closeBackrop = (e) => {
    if (e.currentTarget !== e.target) return;
    onShowModal(false);
    dispatch(contactsActions.setIsEditingContact(false));
  };
  return (
    <div className={classes.backdrop} onClick={closeBackrop}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2>
            Edit Contact - {selectedContact.name} {selectedContact.lastName}
          </h2>
          <button onClick={closeModal}>
            <i className="fa-solid fa-close fa-2x"></i>
          </button>
        </div>
        <ContactsForm selectedContact={selectedContact} />
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
