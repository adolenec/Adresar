import classes from "./DeleteModal.module.css";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const Backdrop = (props) => {
  return (
    <div
      className={classes.backdrop}
      onClick={() => {
        props.onShowModal(false);
      }}
    ></div>
  );
};

const Overlay = (props) => {
  const deleteId = useSelector((state) => state.contacts.deleteItemId);

  const deleteContact = () => {
    props.onRemove(deleteId);
    props.onShowModal(false);
  };

  const onCloseModal = () => {
    props.onShowModal(false);
  };

  return (
    <div className={classes.modal}>
      <div className={classes.header}>
        <h2>Delete Contact</h2>
      </div>
      <div className={classes.content}>
        <p>Are you sure you want to delete this contact?</p>
      </div>
      <div className={classes.actions}>
        <button onClick={onCloseModal}>Close</button>
        <button onClick={deleteContact}>Delete Contact</button>
      </div>
    </div>
  );
};

const DeleteModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Overlay onShowModal={props.onShowModal} onRemove={props.onRemove} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <Backdrop onShowModal={props.onShowModal} />,
        document.getElementById("backdrop")
      )}
    </Fragment>
  );
};

export default DeleteModal;
