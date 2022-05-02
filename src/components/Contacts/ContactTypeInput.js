import classes from "./ContactTypeInput.module.css";

const ContactTypeInput = ({option, enteredContactValueHandler, contactChangeBlurHandler, enteredContactHasError}) => {

  return (
    <div className={classes["form-control"]}>
      <label htmlFor={option.value}>{option.label}</label>
      <input
        id={option.value}
        type={option.value}
        onChange={enteredContactValueHandler}
        onBlur={contactChangeBlurHandler}
      />
      {enteredContactHasError && (
        <p className={classes["error-msg"]}>Please enter a valid contact</p>
      )}
    </div>
  );
};

export default ContactTypeInput;
