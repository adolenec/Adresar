import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={classes.header}>
      <h1>My Address Book</h1>
      <nav>
        <ul>
          <li>
            <input type="search" placeholder="Search..." />
          </li>
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
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
