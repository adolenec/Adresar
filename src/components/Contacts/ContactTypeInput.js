import classes from "./ContactTypeInput.module.css";

const ContactTypeInput = (props) => {
  return (
    <div className={classes["form-control"]}>
      <label htmlFor={props.contactTypeInput}>{props.enteredContactType}</label>
      <input
        id={props.contactTypeInput}
        type={props.contactTypeInput}
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
