import classes from "./SelectedContact.module.css";

const SelectedContact = (props) => {
  return (
    <div className={classes.contact}>
      <div className={classes["user-icon"]}>
        <i className="fa-solid fa-user fa-10x"></i>
      </div>
      <div className={classes['contact-info']}>
          <h2>Name: {props.name}</h2>
          <h2>Last Name: {props.lastName}</h2>
          <h2>Contact Type: {props.contactType}</h2>
          <h2>Contact: {props.contact}</h2>
      </div>
    </div>
  );
};

export default SelectedContact;
