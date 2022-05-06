import { useState } from "react";
import classes from "./ContactsHeader.module.css";

const ContactsHeader = ({
  onSortAsc,
  onSortDesc,
  onSearch,
  onSelectContactsPerPage,
}) => {
  const [isSortedAsc, setIsSortedAsc] = useState(false);
  const [isSortedDesc, setIsSortedDesc] = useState(false);

  const sortAsc = () => {
    setIsSortedAsc(true);
    setIsSortedDesc(false);
    onSortAsc();
  };

  const sortDesc = () => {
    setIsSortedDesc(true);
    setIsSortedAsc(false);
    onSortDesc();
  };


  const searchHandler = (e) => {
    setIsSortedAsc(false);
    setIsSortedDesc(false);
    onSearch(e.target.value);
  };


  const selectChangeHandler = (e) => {
    onSelectContactsPerPage(+e.target.value);
  };

  return (
    <>
      <div className={classes["contacts-header"]}>
        <input type="search" placeholder="Search..." onChange={searchHandler} />
        <div className={classes.buttons}>
          <button onClick={sortAsc}>
            Sort Ascending <i className="fa-solid fa-arrow-up"></i>
          </button>
          <button onClick={sortDesc}>
            Sort Descending <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>
        <div>
          <select
            value=""
            className={classes.select}
            onChange={selectChangeHandler}
          >
            <option value="" disabled>
              Contacts per Page
            </option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      {isSortedAsc && (
        <p className={classes.text}>
          Sorted Alphabetically (A-Z){" "}
          <i className="fa-solid fa-arrow-down-a-z"></i>
        </p>
      )}
      {isSortedDesc && (
        <p className={classes.text}>
          Sorted Alphabetically (Z-A){" "}
          <i className="fa-solid fa-arrow-down-z-a"></i>
        </p>
      )}
    </>
  );
};

export default ContactsHeader;
