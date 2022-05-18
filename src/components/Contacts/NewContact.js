import classes from "./NewContact.module.css";
import ContactForm from "./ContactForm";

const NewContact = () => {
  return (
    <section className={classes["add-contact-form"]}>
      <div className={classes["form-info"]}>
        <i className="fa-solid fa-user fa-10x"></i>
        <h2>Add new user</h2>
      </div>
      <ContactForm/>
    </section>
  );
};

export default NewContact;
