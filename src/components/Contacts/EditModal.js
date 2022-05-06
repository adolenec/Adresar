import ReactDOM from "react-dom";
import { Fragment } from "react";
import classes from "./DeleteModal.module.css";
import NewContactForm from "./NewContactForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contactsActions } from "../store/contacts";
import { Backdrop } from "./DeleteModal";

const EditOverlay = ({ onShowModal }) => {
  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );
  const dispatch = useDispatch();

  const hideModal = () => {
    onShowModal(false);
    dispatch(contactsActions.setIsEditingContact(false));
  };
  return (
    <div className={classes.modal}>
      <div className={classes.header}>
        <h2>
          Edit Contact - {selectedContact.name} {selectedContact.lastName}
        </h2>
        <button onClick={hideModal}>
          <i className="fa-solid fa-close fa-2x"></i>
        </button>
      </div>
      <NewContactForm />
    </div>
  );
};

const EditModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <EditOverlay onShowModal={props.onShowModal} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <Backdrop onShowModal={props.onShowModal} />,
        document.getElementById("backdrop")
      )}
    </Fragment>
  );
};

export default EditModal;
