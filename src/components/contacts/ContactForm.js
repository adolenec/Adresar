import classes from "./ContactForm.module.css";
import useInput from "../../hooks/useInput";
import "../layout/common.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../../config/config";
import { set, ref } from "firebase/database";
import { useDispatch } from "react-redux";
import { contactsActions } from "../../store/contacts";

import { useHistory } from "react-router-dom";
import ContactTypeInput from "./ContactTypeInput";

const ContactForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isEditingContact = useSelector(
    (state) => state.contacts.isEditingContact
  );

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  let today = new Date().toISOString().slice(0, 10);

  //name
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurChangeHandler,
  } = useInput(
    (value) => value.trim().length > 2 && value.trim().length <= 100
  );

  //last name
  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurChangeHandler,
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
  } = useInput((value) => value.trim() !== "");

  //contact type
  const {
    value: enteredContactType,
    inputChangeHandler: enteredContactTypeHandler,
    isValid: enteredContactTypeIsValid,
  } = useInput((value) => value.trim() !== "");

  //contact
  const hasNumber = /\d/;
  const validEmailFormat = /^\S+@\S+\.\S{2}/;

  const {
    value: enteredContactValue,
    inputChangeHandler: enteredContactValueHandler,
    isValid: enteredContactValueIsValid,
    hasError: enteredContactHasError,
    inputBlurHandler: contactChangeBlurHandler,
  } = useInput(
    (value) =>
      (hasNumber.test(value) && value.length > 5) ||
      value.match(validEmailFormat)
  );

  let formIsValid = false;

  if (
    lastNameIsValid &&
    nameIsValid &&
    enteredDateIsValid &&
    enteredContactTypeIsValid &&
    enteredContactValueIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      setErrorMsg("All input fields must be valid!");
      return;
    }

    const newContactData = {
      name: enteredName,
      lastName: enteredLastName,
      dateOfBirth: enteredDate,
      contactType: enteredContactType,
      contact: enteredContactValue,
      isFavourite: false
    };

    fetch("https://adresar-ea8a7-default-rtdb.firebaseio.com/contacts.json", {
      method: "POST",
      body: JSON.stringify({
        contact: newContactData,
      }),
    });

    history.push("/adresar");
  };

  const contactType = [
    {
      value: "",
      label: "Choose Contact Type",
      disabled: true,
    },
    {
      value: "phone",
      label: "Mobile Phone",
    },
    {
      value: "tel",
      label: "Telephone",
    },
    {
      value: "email",
      label: "Email",
    },
    {
      value: "number",
      label: "Pager",
    },
  ];

  const selectedContactType = contactType.find(
    (option) => option.value === enteredContactType
  );

  const editContactSubmitForm = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      setErrorMsg("All input fields must be valid!");
      return;
    }

    const editedContactData = {
      name: enteredName,
      lastName: enteredLastName,
      dateOfBirth: enteredDate,
      contactType: enteredContactType,
      contact: enteredContactValue,
      isFavourite: props.selectedContact.isFavourite
    };

    set(
      ref(database, `contacts/${props.selectedContact.id}/contact`),
      editedContactData
    ).then(() => {
      dispatch(contactsActions.rerender());
    });

    setSuccessMsg("Contact updated successfully!");
    setErrorMsg("");
  };

  const hideEditModal = () => {
    dispatch(contactsActions.hideEditModal());
  };

  return (
    <form
      className={classes.form}
      onSubmit={isEditingContact ? editContactSubmitForm : formSubmitHandler}
    >
      <div className="form-control">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurChangeHandler}
        />
        {nameInputHasError && (
          <p className="error-msg">Please enter a valid name</p>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurChangeHandler}
        />
        {lastNameInputHasError && (
          <p className="error-msg">Please enter a valid last name</p>
        )}
      </div>
      <div className="form-control">
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
          <p className="error-msg">Please enter Date of Birth</p>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="contactType">Contact Type</label>
        <select
          id="contactType"
          name="contactType"
          value={enteredContactType}
          onChange={enteredContactTypeHandler}
        >
          {contactType.map((contact) => (
            <option
              key={contact.value}
              disabled={contact.disabled}
              value={contact.value}
            >
              {contact.label}
            </option>
          ))}
        </select>
      </div>
      {enteredContactType && (
        <ContactTypeInput
          contactType={selectedContactType}
          onContactTypeChange={enteredContactValueHandler}
          onContactTypeBlur={contactChangeBlurHandler}
          hasError={enteredContactHasError}
        />
      )}
      {!isEditingContact && (
        <div className={classes["submit-btn"]}>
          <button>Add New Contact</button>
        </div>
      )}
      {isEditingContact && (
        <div className={classes["submit-btn"]}>
          <button
            type="button"
            className={classes.cancel}
            onClick={hideEditModal}
          >
            Cancel
          </button>
          <button>Edit Contact</button>
          <p className={classes.success}>{successMsg}</p>
        </div>
      )}
      <div className="form-control">
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </div>
    </form>
  );
};

export default ContactForm;
