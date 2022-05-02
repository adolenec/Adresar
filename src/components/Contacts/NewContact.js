import classes from "./NewContact.module.css";
import useInput from "../../hooks/useInput";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ContactTypeInput from "./ContactTypeInput";

const NewContact = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const history = useHistory();
  let today = new Date().toISOString().slice(0, 10);

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
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurChangeHandler,
    resetInputs: resetLastNameHandler,
  } = useInput(
    (value) => value.trim().length > 2 && value.trim().length <= 300
  );

  //date
  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: enteredDateHasError,
    inputChangeHandler: dateChangeHandler,
    inputBlurHandler: dateChangeBlurHandler,
    resetInputs: resetEnteredDateHandler,
  } = useInput((value) => value.trim() !== "");

  //contact type
  const {
    value: enteredContactType,
    inputChangeHandler: enteredContactTypeHandler,
    isValid: enteredContactTypeIsValid,
    resetInputs: resetEnteredContactTypeHandler,
  } = useInput((value) => value.trim() !== "");

  //contact
  const hasNumber = /\d/;
  const validEmailFormat = /^\S+@\S+\.\S{2}/;

  const {
    value: enteredContactValue,
    inputChangeHandler: enteredContactValueHandler,
    isValid: enteredContactValueIsValid,
    hasError: enteredContactHasError,
    resetInputs: resetEnteredContactValueHandler,
    inputBlurHandler: contactChangeBlurHandler,
  } = useInput(
    (value) =>
      (hasNumber.test(value) && value.length > 5) ||
      value.match(validEmailFormat)
  );

  const resetInputs = () => {
    resetNameHandler("");
    resetLastNameHandler("");
    resetEnteredDateHandler("");
    resetEnteredContactTypeHandler("");
    resetEnteredContactValueHandler("");
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !LastNameIsValid ||
      !nameIsValid ||
      !enteredDateIsValid ||
      !enteredContactTypeIsValid ||
      !enteredContactValueIsValid
    ) {
      setErrorMsg("All input fields must be valid!");
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
      }),
    });

    history.push("/adresar");

  };

  let contactTypeInput;
  let contactTypeLabel;

  switch (enteredContactType) {
    case "mobilePhone":
      contactTypeInput = "phone";
      contactTypeLabel = "Mobile Phone";
      break;
    case "telephone":
      contactTypeInput = "tel";
      contactTypeLabel = "Telephone";
      break;
    case "email":
      contactTypeInput = "email";
      contactTypeLabel = "Email";
      break;
    default:
      contactTypeInput = "number";
      contactTypeLabel = "Pager";
  }

  const options = [
    {
      value: 'mobilePhone',
      label: 'Mobile Phone',
    },
    {
      value: 'telephone',
      label: 'Telephone',
    },
    {
      value: 'email',
      label: 'Email',
    },
    {
      value: 'pager',
      label: 'Pager',
    },
  ]

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
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurChangeHandler}
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
            onChange={dateChangeHandler}
            onBlur={dateChangeBlurHandler}
            type="date"
            id="date"
            min="1905-01-01"
            max={today}
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
            {options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        {enteredContactType && (
          <ContactTypeInput
            contactTypeInput={contactTypeInput}
            contactTypeLabel={contactTypeLabel}
            enteredContactType={enteredContactType}
            enteredContactValue={enteredContactValue}
            enteredContactValueHandler={enteredContactValueHandler}
            contactChangeBlurHandler={contactChangeBlurHandler}
            enteredContactHasError={enteredContactHasError}
          />
        )}
        <div className={classes["submit-btn"]}>
          <button>Add New Contact</button>
        </div>
        <div className={classes["form-control"]}>
          {errorMsg && <p className={classes["error-msg"]}>{errorMsg}</p>}
        </div>
      </form>
    </section>
  );
};

export default NewContact;
