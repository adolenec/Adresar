import classes from "./AuthForm.module.css";
import addressBg from "../../assets/addressBook.webp";

import useInput from "../../hooks/useInput";

const AuthForm = (props) => {
  //email
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInputs: resetEmailInput
  } = useInput((value) => value.includes("@"));

  //password
  let specialChars = /[!#$+-]/;
  const hasNumber = /\d/;
  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetInputs: resetPasswordInput
  } = useInput(
    (value) =>
      value.trim().length > 5 &&
      hasNumber.test(value) &&
      specialChars.test(value)
  );

  //overall form validity
  let formIsValid = false;

  if(emailIsValid && passwordIsValid) {
      formIsValid = true;
  }

  const formSubmitHandler = e => {
      e.preventDefault();

      if(!formIsValid){
          return;
      }

      resetEmailInput();
      resetPasswordInput();
  }

  return (
    <section className={classes["form-page"]}>
      <div className={classes["form-info"]}>
        <h1>Address Book</h1>
        <img src={addressBg} alt="address book" />
      </div>
      <div className={classes["form-container"]}>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <div className={classes["form-control"]}>
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            />
            {emailInputHasError && <p>Please enter a valid email address</p>}
          </div>
          <div className={classes["form-control"]}>
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
            />
            {passwordInputHasError && <p>Password must contain at least one number and one special character</p>}
          </div>
          <div className={classes["btn-container"]}>
            <button disabled={!formIsValid}>Login</button>
          </div>
          <button className={classes["switchBtn"]}>
            Don't have an account? Sign up for free!
          </button>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
