import { useState } from 'react';
import classes from "./AuthForm.module.css";
import addressBg from "../../assets/addressBook.webp";
import { useHistory } from 'react-router-dom';

import useInput from "../../hooks/useInput";

const AuthForm = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const history = useHistory();

    const validEmailFormat = /^\S+@\S+\.\S{2}/
  //email
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInputs: resetEmailInput
  } = useInput((value) => value.match(validEmailFormat));

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
        if(!emailIsValid && !passwordIsValid){
          setErrorMsg('Please enter valid input for all fields')
        }
          return;
      }

      let msg;

      const url = isLogin ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuPyU-vTstxsbdjpRKaEc9tGcU2WiwEFQ' :  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuPyU-vTstxsbdjpRKaEc9tGcU2WiwEFQ';

      fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
              'Content-type' : 'application/json'
          }
      }).then(res => {
          if(res.ok){
              return res.json().then(data => {
                  setErrorMsg('');
              });
          } else {
              return res.json().then(data => {
                if (data.error.message === 'INVALID_PASSWORD') {
                    msg = "Invalid password";
                } else if (data.error.message === 'EMAIL_EXISTS'){
                    msg = "Email already exists";
                } else if (data.error.message === 'INVALID_EMAIL'){
                  msg = "Email is invalid!";
                } else {
                    msg = "This e-mail does not exist";
                }
                throw new Error(msg);
              })
          }
      }).then(data => {
          //here save token in redux store later
          history.replace('/adresar') 
      }).catch(errorMsg => {
          setErrorMsg(errorMsg.message);
      })

      resetEmailInput();
      resetPasswordInput();
  }

  const changeAuth = () => {
    setIsLogin((prevState) => !prevState);
    setErrorMsg('');
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            />
            {emailInputHasError && <p className={classes['error-msg']}>Please enter a valid email address</p>}
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
            />
            {passwordInputHasError && <p className={classes['error-msg']}>Password must be at least 6 characters long and contain at least one number and one special character</p>}
          </div>
          <div className={classes["btn-container"]}>
            <button>{isLogin ? 'Login' : 'Sign up'}</button>
          </div>
          <button type="button" className={classes["switchBtn"]} onClick={changeAuth}>
            {isLogin ? `Don't have an account? Sign up for free` : `Already have an account? Login`}
          </button>
          {errorMsg && <p className={classes['error-msg']}>{errorMsg}</p>}
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
