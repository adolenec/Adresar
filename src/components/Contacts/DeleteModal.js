import classes from "./DeleteModal.module.css";
import ReactDOM from "react-dom";

const DeleteOverlay = ({ onRemove, onShowModal, selectedContact }) => {

  const deleteContact = () => {
    onRemove(selectedContact.id);
    onShowModal(false);
  };

  const closeModal = () => {
    onShowModal(false);
  };

  const closeBackrop = (e) => {
    if (e.currentTarget !== e.target) return;
    onShowModal(false);
  };

  return (
    <div className={classes.backdrop} onClick={closeBackrop}>
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
    </div>
  );
};

const DeleteModal = ({ onShowModal, onRemove, selectedContact }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <DeleteOverlay onShowModal={onShowModal} onRemove={onRemove} selectedContact={selectedContact} />,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default DeleteModal;
