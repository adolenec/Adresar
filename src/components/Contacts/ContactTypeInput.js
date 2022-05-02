import classes from "./ContactTypeInput.module.css";

const ContactTypeInput = (props) => {


    // const getSelectedContactType = (value) => {
    //     return props.options.find(option => option.value === value);
    //   }
    
    //   console.log(getSelectedContactType(props.enteredContactType));

    console.log(props.option);

  return (
    <div className={classes["form-control"]}>
      <label htmlFor={props.enteredContactType}>{props.option.label}</label>
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
