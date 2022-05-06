import classes from "./DeleteModal.module.css";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";

export const Backdrop = ({ onShowModal }) => {
  return (
    <div
      className={classes.backdrop}
      onClick={() => {
        onShowModal(false);
      }}
    ></div>
  );
};

const DeleteOverlay = ({ onRemove, onShowModal }) => {
  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact
  );

  const deleteContact = () => {
    onRemove(selectedContact.id);
    onShowModal(false);
  };

  const closeModal = () => {
    onShowModal(false);
  };

  return (
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
        <button onClick={deleteContact}>Delete Contact</button>
      </div>
    </div>
  );
};

const DeleteModal = ({ onShowModal, onRemove }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <DeleteOverlay onShowModal={onShowModal} onRemove={onRemove} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <Backdrop onShowModal={onShowModal} />,
        document.getElementById("backdrop")
      )}
    </Fragment>
  );
};

export default DeleteModal;
