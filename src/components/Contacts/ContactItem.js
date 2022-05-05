import classes from "./ContactItem.module.css";

const ContactItem = ({ name, lastName, contact }) => {
  return (
    <div className={classes["contact-item"]}>
      <div className={classes["user-icon"]}>
        <i className="fa-solid fa-user fa-4x"></i>
      </div>
      <div className={classes["contact-info"]}>
        <h3>
          {name} {lastName}
        </h3>
        <h3>{contact}</h3>
      </div>
      <div className={classes["contact-actions"]}>
        <button>
          <i className="fa-solid fa-star fa-2x"></i>
        </button>
        <button>
          <i className="fa-solid fa-pencil fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
