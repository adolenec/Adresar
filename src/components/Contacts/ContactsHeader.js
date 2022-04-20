import classes from "./ContactsHeader.module.css";

const ContactsHeader = (props) => {

    const sortAsc = () => {
        props.onSortAsc();
    }

    const sortDesc = () => {
        props.onSortDesc();
    }

    const searchHandler = e => {
        props.onInput(e.target.value);
    }

  return (
    <div className={classes['contacts-header']}>
      <input type="search" placeholder="Search..." onChange={searchHandler} />
      <div className={classes.buttons}>
        <button onClick={sortAsc}>Sort Ascending <i className="fa-solid fa-arrow-up"></i></button>
        <button onClick={sortDesc}>Sort Descending <i className="fa-solid fa-arrow-down"></i></button>
      </div>
    </div>
  );
};

export default ContactsHeader;
