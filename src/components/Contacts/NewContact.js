import classes from "./NewContact.module.css";
import useInput from "../../hooks/useInput";

const NewContact = () => {
  //name
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurChangeHandler,
    resetInputs: resetNameHandler,
  } = useInput(
    (value) => value.trim().length > 2 && value.trim().length <= 100
  );

  //last name
  const {
    value: enteredLastName,
    isValid: LastNameIsValid,
    hasError: LastNameInputHasError,
    inputChangeHandler: LastNameChangeHandler,
    inputBlurHandler: LastNameBlurChangeHandler,
    resetInputs: resetLastNameHandler,
  } = useInput(
    (value) => value.trim().length > 2 && value.trim().length <= 300
  );

  //date
  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: enteredDateHasError,
    inputChangeHandler: DateChangeHandler,
    inputBlurHandler: DateChangeBlurHandler,
    resetInputs: resetEnteredDateHandler,
  } = useInput((value) => value.trim() !== "");

  //contact type
  const {
    value: enteredContactType,
    inputChangeHandler: enteredContactTypeHandler,
    isValid: enteredContactTypeIsValid,
    resetInputs: resetEnteredContactTypeHandler,
  } = useInput((value) => value.trim() !== "");

  const hasNumber = /\d/;

  //contact

  const {
    value: enteredContactValue,
    inputChangeHandler: enteredContactValueHandler,
    isValid: enteredContactValueIsValid,
    resetInputs: resetEnteredContactValueHandler,
  } = useInput((value) => hasNumber.test(value) || value.includes("@"));

  //overall form validity
  let formIsValid = false;
  if (
    LastNameIsValid &&
    nameIsValid &&
    enteredDateIsValid &&
    enteredContactTypeIsValid &&
    enteredContactValueIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = e => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const newContactData = {
      name: enteredName,
      lastName: enteredLastName,
      dateOfBirth: enteredDate,
      contactType: enteredContactType,
      contact: enteredContactValue,
    };

    fetch("https://adresar-ea8a7-default-rtdb.firebaseio.com/contacts.json", {
      method: "POST",
      body: JSON.stringify({
        contact: newContactData,
      })
    });

    //reset inputs
    resetNameHandler("");
    resetLastNameHandler("");
    resetEnteredDateHandler("");
    resetEnteredContactTypeHandler("");
    resetEnteredContactValueHandler("");
  };

  const contactTypeInput =
    enteredContactType === "Mobile Phone"
      ? "phone"
      : enteredContactType === "Telephone"
      ? "tel"
      : enteredContactType === "Email"
      ? "email"
      : "text";

  return (
    <section className={classes["add-contact-form"]}>
      <div className={classes["form-info"]}>
        <i className="fa-solid fa-user fa-10x"></i>
        <h2>Add new user</h2>
      </div>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes["form-control"]}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurChangeHandler}
          />
          {nameInputHasError && (
            <p className={classes["error-msg"]}>Please enter a valid name</p>
          )}
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={enteredLastName}
            onChange={LastNameChangeHandler}
            onBlur={LastNameBlurChangeHandler}
          />
          {LastNameInputHasError && (
            <p className={classes["error-msg"]}>
              Please enter a valid last name
            </p>
          )}
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="date">Date of Birth</label>
          <input
            value={enteredDate}
            onChange={DateChangeHandler}
            onBlur={DateChangeBlurHandler}
            type="date"
            id="date"
            min="1950-01-01"
            max="2011-12-31"
          />
          {enteredDateHasError && (
            <p className={classes["error-msg"]}>Please enter Date of Birth</p>
          )}
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="contactType">Contact Type</label>
          <select
            id="contactType"
            name="contactType"
            value={enteredContactType}
            onChange={enteredContactTypeHandler}
          >
            <option value="" disabled>
              Choose Contact Type
            </option>
            <option value="Mobile Phone">Mobile phone</option>
            <option value="Telephone">Telephone</option>
            <option value="Email">Email</option>
            <option value="Pager">Pager</option>
          </select>
        </div>
        {enteredContactType && (
          <div className={classes["form-control"]}>
            <label htmlFor="phone">{enteredContactType}</label>
            <input
              type={contactTypeInput}
              value={enteredContactValue}
              onChange={enteredContactValueHandler}
            />
          </div>
        )}
        <div className={classes["submit-btn"]}>
          <button disabled={!formIsValid}>Add New Contact</button>
        </div>
      </form>
    </section>
  );
};

export default NewContact;
