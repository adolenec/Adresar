import classes from "./DeleteModal.module.css";
import ReactDOM from "react-dom";
import { Fragment } from "react";

const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};

const Overlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.header}>
        <h2>Delete Contact</h2>
      </div>
      <div className={classes.content}>
        <p>Are you sure you want to delete this contact?</p>
      </div>
      <div className={classes.actions}>
        <button>Close</button>
        <button>Delete Contact</button>
      </div>
    </div>
  );
};

const DeleteModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Overlay />, document.getElementById("overlay"))}
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
    </Fragment>
  );
};

export default DeleteModal;
