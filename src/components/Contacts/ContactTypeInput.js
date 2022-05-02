import classes from "./ContactTypeInput.module.css";

const ContactTypeInput = (props) => {
  return (
    <div className={classes["form-control"]}>
      <label htmlFor={props.enteredContactType}>{props.contactTypeLabel}</label>
      <input
        id={props.enteredContactType}
        type={props.enteredContactType}
        value={props.enteredContactValue}
        onChange={props.enteredContactValueHandler}
        onBlur={props.contactChangeBlurHandler}
      />
      {props.enteredContactHasError && (
        <p className={classes["error-msg"]}>Please enter a valid contact</p>
      )}
    </div>
  );
};

export default ContactTypeInput;
