import classes from "./ContactTypeInput.module.css";

const ContactTypeInput = (props) => {

  return (
    <div className={classes["form-control"]}>
      <label htmlFor={props.option.value}>{props.option.label}</label>
      <input
        id={props.option.value}
        type={props.option.value}
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
