import classes from "./ContactsHeader.module.css";

const ContactsHeader = () => {
  return (
    <div className={classes['contacts-header']}>
      <input type="search" placeholder="Search..." />
      <div className={classes.buttons}>
        <button>Sort Ascending <i className="fa-solid fa-arrow-up"></i></button>
        <button>Sort Descending <i className="fa-solid fa-arrow-down"></i></button>
      </div>
    </div>
  );
};

export default ContactsHeader;
