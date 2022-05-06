import classes from "./SelectedContact.module.css";

const SelectedContact = ({ name, lastName, contactType, contact }) => {
  return (
    <div className={classes.contact}>
      <div className={classes["user-icon"]}>
        <i className="fa-solid fa-user fa-10x"></i>
      </div>
      <div className={classes["contact-info"]}>
        <h2>Name: {name}</h2>
        <h2>Last Name: {lastName}</h2>
        <h2>Contact Type: {contactType}</h2>
        <h2>Contact: {contact}</h2>
      </div>
    </div>
  );
};

export default SelectedContact;
