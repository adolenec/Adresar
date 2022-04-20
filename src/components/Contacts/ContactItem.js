import classes from "./ContactItem.module.css";

const ContactItem = (props) => {
  return (
    <div className={classes["contact-item"]}>
      <div className={classes["user-icon"]}>
        <i className="fa-solid fa-user fa-4x"></i>
      </div>
      <div className={classes["contact-info"]}>
        <h3>
          {props.name} {props.lastName}
        </h3>
        <h3>{props.contact}</h3>
      </div>
      <div className={classes['contact-actions']}>
          <button><i className="fa-solid fa-star fa-2x"></i></button>
          <button><i className="fa-solid fa-pencil fa-2x" ></i></button>
      </div>
    </div>
  );
};

export default ContactItem;
