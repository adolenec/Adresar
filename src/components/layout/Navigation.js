import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import { authActions } from "../../store/auth";

const Navigation = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.setToken(null));
  };

  return (
    <header className={classes.header}>
      <h1>My Address Book</h1>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/kontakt">
              <i className="fa-solid fa-user-plus"></i> New Contact
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/adresar" exact>
              <i className="fa-solid fa-user-group"></i> My Contacts
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/adresar/omiljeni">
              <i className="fa-solid fa-star"></i> Favourites
            </NavLink>
          </li>
          <li>
            <button className={classes["logout-btn"]} onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
