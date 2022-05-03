import classes from "./ContactTypeInput.module.css";

const ContactTypeInput = ({contactType, onContactTypeChange, onContactTypeBlur, hasError}) => {

  return (
    <div className={classes["form-control"]}>
      <label htmlFor={contactType.value}>{contactType.label}</label>
      <input
        id={contactType.value}
        type={contactType.value}
        onChange={onContactTypeChange}
        onBlur={onContactTypeBlur}
      />
      {hasError && (
        <p className={classes["error-msg"]}>Please enter a valid contact</p>
      )}
    </div>
  );
};

export default ContactTypeInput;
