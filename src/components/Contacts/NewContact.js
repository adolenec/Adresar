import classes from "./NewContact.module.css";

import NewContactForm from "./NewContactForm";


const NewContact = () => {
 
  return (
    <section className={classes["add-contact-form"]}>
      <div className={classes["form-info"]}>
        <i className="fa-solid fa-user fa-10x"></i>
        <h2>Add new user</h2>
      </div>

      <NewContactForm />

      
    </section>
  );
};

export default NewContact;
