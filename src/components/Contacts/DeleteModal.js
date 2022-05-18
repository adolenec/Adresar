import classes from "./DeleteModal.module.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { contactsActions } from "../../store/contacts";
import { database } from "../../config/config";
import { ref, set } from "firebase/database";

const DeleteOverlay = () => {
  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );
  const dispatch = useDispatch();

  const deleteContact = () => {
    set(ref(database, `contacts/${selectedContact.id}`), null).then(() => {
      dispatch(contactsActions.rerender());
    });

    dispatch(contactsActions.hideDeleteModal());
  };

  const closeModal = () => {
    dispatch(contactsActions.hideDeleteModal());
  };

  return (
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2>
            Delete Contact - {selectedContact.name} {selectedContact.lastName}
          </h2>
          <button onClick={closeModal}>
            <i className="fa-solid fa-close fa-2x"></i>
          </button>
        </div>
        <div className={classes.content}>
          <p>Are you sure you want to delete this contact?</p>
        </div>
        <div className={classes.actions}>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={deleteContact} className={classes.delete}>
            Delete Contact
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <DeleteOverlay />,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default DeleteModal;
